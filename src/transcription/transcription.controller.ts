import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranscriptionService } from './transcription.service';


@Controller('transcription')
export class TranscriptionController {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async transcribe(@UploadedFile() file: any) {
    const transcript = await this.transcriptionService.transcribeAudio(file.path);
    return { texto: transcript };
  }
}
