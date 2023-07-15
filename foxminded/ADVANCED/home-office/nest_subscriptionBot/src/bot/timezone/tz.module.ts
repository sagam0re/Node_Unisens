import { Module } from '@nestjs/common';
import { ConvertTimeService } from './timezone.service';

@Module({
  providers: [ConvertTimeService],
  exports: [ConvertTimeService],
})
export class ConvertTimeModule {}
