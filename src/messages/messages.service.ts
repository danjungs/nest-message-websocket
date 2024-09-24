import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messagesRepo: Repository<Message>) {}

  async createMessage(payload: any) {
    const { content, user } = payload
    const newMessage = await this.messagesRepo.create({message: content, user});
    await this.messagesRepo.save(newMessage);
    return newMessage;
  }

  getAllMessages() {
    return this.messagesRepo.find();
  }
}
