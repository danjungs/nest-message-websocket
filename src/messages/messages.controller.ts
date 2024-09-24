import { Controller, Get } from '@nestjs/common';
import { Message } from './message.entity';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async getAllMessages(): Promise<Message[]> {
    const messages = await this.messagesService.getAllMessages();
    return messages;
  }
}
