import { writeFile, readFile } from 'fs';
import { homedir } from 'os';

export interface Context {
  name: string;
  description: string;
}

interface Contexts {
  [contextName: string]: Context;
}

interface Configuration {
  contexts: Contexts;
}

const CONFIG_PATH: string = `${homedir()}/.cpcrc`;
const initialConfig: Configuration = {
  contexts: {},
};

export default class Config {
  private static get(): Promise<Configuration> {
    return new Promise((resolve, reject) => {
      readFile(CONFIG_PATH, 'utf8' , (err: NodeJS.ErrnoException | null, data: string): void => {
        if (err) {
          resolve(initialConfig);
          return;
        }
        try {
          const jsonConfig: Configuration = JSON.parse(data);
          resolve(jsonConfig);
        } catch (e) {
          reject(e);
        }
      })
    });
  }

  private static save(config: Configuration): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const data: string = JSON.stringify(config);
        writeFile(CONFIG_PATH, data, (err: NodeJS.ErrnoException | null): void => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  static async saveContext(context: Context): Promise<void> {
    const config: Configuration = await Config.get();
    config.contexts = {
      ...config.contexts,
      [context.name]: context
    };
    await Config.save(config);
  }
}
