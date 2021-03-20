import path from 'path';
import { CoreAction } from './';
import Config from '../shared/config';
import { Context } from '../models/context';
import Logger from '../shared/logger';

export default class Load implements CoreAction {
  private static FILE_CONFIG = 'cpcconfig.json';

  async exec([configPath]: string[]): Promise<void> {
    try {
      const context: Context = await this.getContext(configPath);
      await Config.saveContext(context);
      await Config.saveCurrent(context.name);
    } catch (e) {
      console.error(e);
    }
  }

  getContext(configPath?: string): Promise<Context> {
    const filePath: string = configPath || Load.FILE_CONFIG;
    const absolutePath: string = path.join(process.cwd(), filePath);
    return new Promise((resolve, reject) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const jsonContext: Context = require(absolutePath);
        resolve(jsonContext);
      } catch (e) {
        reject(`Unable to open ${Logger.bold(absolutePath)}`);
      }
    });
  }

  summary(): string {
    return `Loads a configuration from the '${Load.FILE_CONFIG}' file.
\t     Or you can also pass the path to a custom configuration file.
\t     e.g. cpc load someconfig.js`;
  }
}
