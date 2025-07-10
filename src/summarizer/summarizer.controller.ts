import { Controller, Post, Body } from '@nestjs/common';
import { SummarizerService } from './summarizer.service';

@Controller('summarize')
export class SummarizerController {
  constructor(private readonly summarizerService: SummarizerService) {}

  @Post()
  async summarize(@Body('text') text: string) {
    const summary = await this.summarizerService.summarizeText(text);
    return { resumen: summary };
  }
}
