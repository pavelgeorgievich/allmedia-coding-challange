import { Module } from '@nestjs/common';
import {
  ProviderConnection,
  ProviderFactory,
  ResponseMappingStrategy,
} from '../../utils/external.providers.service';
import { ResponseValidationStrategy } from '../../utils/external.providers.service';
import {
  SecondaryProviderConnection,
  SecondaryProviderMappingStrategy,
  SecondaryProviderResponseValidationStrategy,
} from './strategies';

export const SECONDARY_PROVIDER_INJECTION_TOKEN = 'SECONDARY_PROVIDER';

const secondaryRepositoryProvider = ProviderFactory(
  SECONDARY_PROVIDER_INJECTION_TOKEN,
);

@Module({
  providers: [
    secondaryRepositoryProvider,
    { provide: ProviderConnection, useClass: SecondaryProviderConnection },
    {
      provide: ResponseValidationStrategy,
      useClass: SecondaryProviderResponseValidationStrategy,
    },
    {
      provide: ResponseMappingStrategy,
      useClass: SecondaryProviderMappingStrategy,
    },
  ],
  exports: [secondaryRepositoryProvider],
})
export class SecondaryProviderModule {}
