import { MessagesRepository } from './messages.repository';
export class MessagesService {
  messagesRepo: MessagesRepository;
  constructor() {
    // service is creating its own dependencies; the service cannot work unless it has reporsitory
    // dont do this on real apps. use dependency injection instead.
    this.messagesRepo = new MessagesRepository();
  }
  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }
}
