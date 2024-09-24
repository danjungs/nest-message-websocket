import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from './messages.service';

@WebSocketGateway({cors: true})
export class MessagesGateway {
  constructor(private messagesService: MessagesService) {}
  private logger: Logger = new Logger('MessagesGateway')
  @WebSocketServer() wss: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: any, payload: any) {
    this.logger.log('New Message');
    const newMessage = await this.messagesService.createMessage(payload);
    this.wss.emit('receiveMessage', newMessage);
  }
}
