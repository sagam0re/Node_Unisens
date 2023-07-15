import { BotModule } from './bot/bot.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegrafModule } from 'nestjs-telegraf';
import config from './config/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(config().database.uri),
    TelegrafModule.forRoot({
      token: config().telegram.token,
    }),
    CronModule,
    BotModule,
  ],
})
export class AppModule {}
