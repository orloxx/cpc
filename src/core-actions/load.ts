import { readFile } from 'fs';
import { CoreAction } from './';
import Config, { Context } from '../shared/config';

export default class Load implements CoreAction {
  private static FILE_CONFIG = 'cpcconfig.json';

  async exec(): Promise<void> {
    try {
      const context: Context = await this.getContext();
      await Config.saveContext(context);
      await Config.saveCurrent(context.name);
    } catch (e) {
      console.error(e);
    }
  }

  getContext(): Promise<Context> {
    return new Promise((resolve, reject) => {
      readFile(
        Load.FILE_CONFIG,
        'utf8',
        (err: NodeJS.ErrnoException | null, data: string): void => {
          if (err) {
            reject(err);
            return;
          }

          try {
            const jsonContext: Context = JSON.parse(data);
            resolve(jsonContext);
          } catch (e) {
            reject(e);
          }
        },
      );
    });
  }

  summary(): string {
    return `Loads a configuration from the '${Load.FILE_CONFIG}' file.`;
  }
}
