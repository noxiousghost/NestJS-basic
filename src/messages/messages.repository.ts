import { handleJson } from '../utils/handleJson.util';
export class MessagesRepository {
  async findOne(id: string) {
    const contents = await handleJson.readJsonFile();
    return contents[id];
  }
  async findAll() {
    const contents = await handleJson.readJsonFile();
    return contents;
  }

  async create(content: string) {
    const contents = await handleJson.readJsonFile();
    const id = Math.floor(Math.random() * 999);
    contents[id] = { id, content };
    await handleJson.writeJsonFile(contents);
  }
}
