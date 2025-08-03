import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as fs from 'fs';
import * as FormData from 'form-data';

@Injectable()
export class TranscriptionService {
  private readonly API_URL = 'https://api.assemblyai.com/v2';
  private readonly API_KEY = '5c260f8b8a334a259a18eaf3acb57e00';

  constructor(private http: HttpService) {}

  async transcribeAudioFromBuffer(
  buffer: Buffer,
  filename: string,
  mimetype: string,
): Promise<string> {
  const formData = new FormData();
  formData.append('file', buffer, {
    filename,
    contentType: mimetype,
  });

  // Paso 1: subir el archivo
  const uploadResponse = await lastValueFrom(
    this.http.post(`${this.API_URL}/upload`, formData, {
      headers: {
        ...formData.getHeaders(),
        authorization: this.API_KEY,
      },
    }),
  );

  const audioUrl = uploadResponse.data.upload_url;

  // Paso 2: solicitar transcripción
  const transcribeResponse = await lastValueFrom(
    this.http.post(
      `${this.API_URL}/transcript`,
      { audio_url: audioUrl },
      {
        headers: { authorization: this.API_KEY },
      },
    ),
  );

  const transcriptId = transcribeResponse.data.id;

  // Paso 3: esperar el resultado
  let status = 'processing';
  let transcript = '';

  while (status !== 'completed') {
    const poll = await lastValueFrom(
      this.http.get(`${this.API_URL}/transcript/${transcriptId}`, {
        headers: { authorization: this.API_KEY },
      }),
    );

    status = poll.data.status;
    transcript = poll.data.text;

    if (status === 'failed') throw new Error('Transcripción fallida');

    await new Promise((res) => setTimeout(res, 3000)); // espera 3s
  }

  return transcript;
}

}