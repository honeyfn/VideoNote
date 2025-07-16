import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // elimina propiedades que no están en los DTO
    forbidNonWhitelisted: true, // lanza error si mandan propiedades extras
    transform: true, // convierte automáticamente tipos (por ej. string a number)
  }));
  await app.listen(3000);
}
bootstrap();
