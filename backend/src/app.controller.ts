import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ChatDto } from './dto/chat.dto';
import { LlmService } from './llm/llm.service';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly llmService: LlmService
  ) {}

  @Post('echo')
  echoMessage(@Body('message') message: string) {
    return { message };
  }

  @Post('chat')
  async chat(@Body() body: ChatDto) {
    const reply = await this.llmService.getExpertReply(body.message);
    return { reply };
  }
}
