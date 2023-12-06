import { Controller, Inject, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AGGREGATED_PROVIDERS_INJECTION_TOKEN } from '../providers/providers.module';
import { IOffer } from './offer.entity';
import { ExternalProvidersService } from '../utils/external.providers.service';
import { OfferDTO } from './offer.dto';
import { validate } from 'class-validator';

@Controller('offers')
export class OffersController {
  private readonly logger = new Logger(OffersController.name);
  constructor(
    @Inject(AGGREGATED_PROVIDERS_INJECTION_TOKEN)
    private providers: ExternalProvidersService<unknown, IOffer>[],
  ) {}

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
