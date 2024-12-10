import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';
@Controller('/messages')
export class MessagesController {
  messagesService: MessagesService;
  constructor() {
    this.messagesService = new MessagesService();
  }
  @Get('/')
  async listMessages() {
    const result = await this.messagesService.findAll();
    if (!result) {
      throw new NotFoundException('messages not found');
    }
    return result;
  }

  @Post('/')
  async postMessages(@Body() body: CreateMessageDto) {
    return await this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const result = await this.messagesService.findOne(id);
    if (!result) {
      throw new NotFoundException('messages not found');
    }
    return result;
  }
}
