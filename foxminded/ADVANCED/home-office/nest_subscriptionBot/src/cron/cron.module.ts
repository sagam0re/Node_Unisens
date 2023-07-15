import { Module } from '@nestjs/common';
import { BotModule } from 'src/bot/bot.module';
import { WeatherModule } from 'src/bot/weather/weather.module';
import { CronService } from './cron.service';

@Module({
  imports: [BotModule, WeatherModule],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
