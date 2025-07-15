import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SummarizerService {
  constructor(private http: HttpService) {}

  async summarizeText(text: string): Promise<string> {
    const url = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';

    const headers = {
      Authorization: '4793e1b591d643ffa4e0a0e5eeead1ec', 
    };

    const response = await lastValueFrom(
      this.http.post(
        url,
        { inputs: text },
        { headers }
      )
    );

    return response.data[0]?.summary_text || 'No se pudo generar resumen';
  }
}