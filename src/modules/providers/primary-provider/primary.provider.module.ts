import { Module } from '@nestjs/common';
import {
  ProviderConnection,
  ProviderFactory,
  ResponseMappingStrategy,
} from '../../utils/external.providers.service';
import { ResponseValidationStrategy } from '../../utils/external.providers.service';
import {
  PrimaryProviderConnection,
  PrimaryProviderMappingStrategy,
  PrimaryProviderResponseValidationStrategy,
} from './strategies';

export const PRIMARY_PROVIDER_INJECTION_TOKEN = 'PRIMARY_PROVIDER';

const primaryRepositoryProvider = ProviderFactory(
  PRIMARY_PROVIDER_INJECTION_TOKEN,
);

@Module({
  providers: [
    primaryRepositoryProvider,
    {
      provide: ProviderConnection,
      useClass: PrimaryProviderConnection,
    },
    {
      provide: ResponseValidationStrategy,
      useClass: PrimaryProviderResponseValidationStrategy,
    },
    {
      provide: ResponseMappingStrategy,
      useClass: PrimaryProviderMappingStrategy,
    },
  ],
  exports: [primaryRepositoryProvider],
})
export class PrimaryProviderModule {}
