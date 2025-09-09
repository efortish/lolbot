import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LlmService {
  private apiKey = process.env.LLM_API_KEY;
  private model = process.env.LLM_MODEL;
  private apiUrl = process.env.LLM_API_URL;

  constructor() {
    if (!this.apiKey || !this.model || !this.apiUrl) {
      throw new Error('Missing required environment variables: LLM_API_KEY, LLM_MODEL, LLM_API_URL');
    }
  }

  async getExpertReply(message: string): Promise<string> {
    const systemPrompt = `You are an expert in League of Legends. Only answer questions about League of Legends. If the question is about another topic, politely reply that you can only talk about League of Legends.`;

    try {
      console.log(`Making request to: ${this.apiUrl}/${this.model}:generateContent?key=${this.apiKey?.slice(0,10)}...`);
      const res = await axios.post(
        `${this.apiUrl}/${this.model}:generateContent?key=${this.apiKey}`,
        {
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\nUser: ${message}` }] }
          ]
        }
      );
      return res.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply';
    } catch (e) {
      console.error('Gemini API error:', e?.response?.data || e.message || e);
      throw new InternalServerErrorException('LLM service error');
    }
  }
}
