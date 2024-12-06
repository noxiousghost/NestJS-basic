import * as path from 'path';
import { promises as fs } from 'fs';

class HandleJson {
  private readonly dirPath = path.resolve(__dirname, '../');
  private readonly filePath = path.join(this.dirPath, '/messages.json');

  async checkPath(path) {
    try {
      await fs.access(path);
      return true;
    } catch (error) {
      return false;
    }
  }

  async handleStorageExist() {
    const doesFolderExist = await this.checkPath(this.dirPath);
    if (!doesFolderExist) {
      await fs.mkdir(this.dirPath);
    }
    const doesFileExist = await this.checkPath(this.filePath);
    if (!doesFileExist) {
      await fs.writeFile(this.filePath, JSON.stringify([]));
    }
  }

  async readJsonFile() {
    if (!(await this.checkPath(this.filePath))) {
      throw new Error('JSON file does not exist');
    }
    const data = await fs.readFile(this.filePath, 'utf-8');
    try {
      JSON.parse(data);
    } catch (_err) {
      throw new Error('JSON file contains invalid syntax. Fix it manually');
    }
    return data ? JSON.parse(data) : [];
  }
  async writeJsonFile(allTasks) {
    if (!(await this.checkPath(this.filePath))) {
      throw new Error('JSON file does not exist');
    }
    await fs.writeFile(
      this.filePath,
      JSON.stringify(allTasks, null, 2),
      'utf-8',
    );
  }
}

const handleJson = new HandleJson();
export { handleJson };
