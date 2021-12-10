import path from 'path';
import { CoreAction } from './';
import Config from '../shared/config';
import { Context } from '../models/context';
import Logger from '../shared/logger';
import Run from './run';

export default class Load implements CoreAction {
  async exec([configPath]: string[]): Promise<void> {
    try {
      const context: Context = await this.getContext(configPath);
      await Config.saveContext(context);
      const current: Context = await Config.saveCurrent(context.name);

      if (current.actions.postuse) {
        const runAction: Run = new Run();
        runAction.run(current.actions.postuse);
      }
    } catch (e) {
      console.error(e);
    }
  }

  getContext(configPath?: string): Promise<Context> {
    const filePath: string = configPath || Config.FILE_CONFIG;
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
    return `Loads a configuration from the '${Config.FILE_CONFIG}' file.
\t     Or you can also pass the path to a custom configuration file.
\t     e.g. cpc load someconfig.js`;
  }
}
