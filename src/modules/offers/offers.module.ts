import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { PrimaryProviderModule } from './primary-provider/primary.provider.module';
import { SecondaryProviderModule } from './secondary-provider/secondary.provider.module';

@Module({
  imports: [PrimaryProviderModule, SecondaryProviderModule],
  controllers: [OffersController],
  providers: [],
})
export class OffersModule {}
