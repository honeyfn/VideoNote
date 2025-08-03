import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { NotesModule } from './notes/notes.module';
import { SummarizerModule } from './summarizer/summarizer.module';
import { UsersModule } from 'src/users/users.module';
import { TranscriptionModule } from './transcription/transcription.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    PrismaModule,
    NotesModule,
    SummarizerModule,
    UsersModule,
    TranscriptionModule,
  ],
})
export class AppModule {}
