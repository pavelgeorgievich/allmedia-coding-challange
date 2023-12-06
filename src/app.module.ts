import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OffersModule } from './modules/offers/offers.module';

@Module({
  imports: [ScheduleModule.forRoot(), OffersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
