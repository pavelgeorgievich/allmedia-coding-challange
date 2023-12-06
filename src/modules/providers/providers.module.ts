import { Module } from '@nestjs/common';
import { IOffer } from '../offers/offer.entity';
import { ExternalProvidersService } from '../utils/external.providers.service';
import { Payload as PrimaryPayload } from './primary-provider/primary.provider.interface';
import {
  PRIMARY_PROVIDER_INJECTION_TOKEN,
  PrimaryProviderModule,
} from './primary-provider/primary.provider.module';
import { Payload as SecondaryPayload } from './secondary-provider/secondary.provider.interface';
import {
  SECONDARY_PROVIDER_INJECTION_TOKEN,
  SecondaryProviderModule,
} from './secondary-provider/secondary.provider.module';

export const AGGREGATED_PROVIDERS_INJECTION_TOKEN = 'AGGREGATED_PROVIDERS';

export function AggregateProviderFactory(injectionToken: string) {
  return {
    provide: injectionToken,
    useFactory: (
      primaryProviderService: ExternalProvidersService<PrimaryPayload, IOffer>,
      secondaryProviderService: ExternalProvidersService<
        SecondaryPayload,
        IOffer
      >,
    ) => {
      return [primaryProviderService, secondaryProviderService];
    },
    inject: [
      PRIMARY_PROVIDER_INJECTION_TOKEN,
      SECONDARY_PROVIDER_INJECTION_TOKEN,
    ],
  };
}

@Module({
  imports: [PrimaryProviderModule, SecondaryProviderModule],
  providers: [AggregateProviderFactory(AGGREGATED_PROVIDERS_INJECTION_TOKEN)],
  exports: [AggregateProviderFactory(AGGREGATED_PROVIDERS_INJECTION_TOKEN)],
})
export class ProvidersModule {}
