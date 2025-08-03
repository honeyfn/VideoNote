import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TranscriptionService } from './transcription.service';

@Controller('transcription')
export class TranscriptionController {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async transcribe(@UploadedFile() file: Express.Multer.File) {
    console.log('Archivo recibido:', file);
    console.log('Iniciando transcripción para:', file.originalname);

    const transcript = await this.transcriptionService.transcribeAudioFromBuffer(
      file.buffer,
      file.originalname,
      file.mimetype,
    );
    return { texto: transcript };
  }
}