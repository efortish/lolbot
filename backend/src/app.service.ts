import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  

  replyToMessage(message: string): string {
    // Deterministic reply: prefix with "Bot: "
    return `Bot: ${message}`;
  }
}
