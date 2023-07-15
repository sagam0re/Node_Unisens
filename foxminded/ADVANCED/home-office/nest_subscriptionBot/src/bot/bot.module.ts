import { BotService } from './bot.service';
import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { DBModule } from '../database/db.module';
import { ConvertTimeModule } from './timezone/tz.module';

@Module({
  imports: [DBModule, ConvertTimeModule],
  providers: [BotService, BotUpdate],
  exports: [BotService],
})
export class BotModule {}
