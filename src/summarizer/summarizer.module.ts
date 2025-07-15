import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SummarizerService } from './summarizer.service';
import { SummarizerController } from './summarizer.controller';

@Module({
  imports: [HttpModule],
  controllers: [SummarizerController],
  providers: [SummarizerService],
})
export class SummarizerModule {}