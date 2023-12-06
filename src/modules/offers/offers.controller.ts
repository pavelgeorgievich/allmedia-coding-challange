import { Controller, Inject, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { IOffer } from './offer.entity';
import { PRIMARY_PROVIDER_INJECTION_TOKEN } from './primary-provider/primary.provider.module';
import { SECONDARY_PROVIDER_INJECTION_TOKEN } from './secondary-provider/secondary.provider.module';
import { ExternalProvidersService } from './utils/external.providers.service';
import { OfferDTO } from './offer.dto';
import { validate } from 'class-validator';
import { Payload as PrimaryPayload } from './primary-provider/primary.provider.interface';
import { Payload as SecondaryPayload } from './primary-provider/primary.provider.interface';

@Controller('offers')
export class OffersController {
  private readonly logger = new Logger(OffersController.name);
  private providers: ExternalProvidersService<unknown, IOffer>[] = [];
  constructor(
    @Inject(PRIMARY_PROVIDER_INJECTION_TOKEN)
    private primaryProviderService: ExternalProvidersService<
      PrimaryPayload,
      IOffer
    >,
    @Inject(SECONDARY_PROVIDER_INJECTION_TOKEN)
    private secondaryProviderService: ExternalProvidersService<
      SecondaryPayload,
      IOffer
    >,
  ) {
    this.providers = [
      this.primaryProviderService,
      this.secondaryProviderService,
    ];
  }

  @Cron('*/10 * * * * *')
  async offersJob() {
    this.logger.debug('Fetching offers');
    const offers = await Promise.all(
      this.providers.map((provider) => provider.getOffers()),
    );

    const allOffers = offers.flat();

    for (const offer of allOffers) {
      const offerDto = new OfferDTO();
      Object.assign(offerDto, offer);
      validate(offerDto).then((errors) => {
        if (errors.length > 0) {
          this.logger.debug('Validation failed: ', errors);
        } else {
          this.logger.debug(
            JSON.stringify(offerDto),
            'Validation succeed, save to the database',
          );
        }
      });
    }
  }
}
