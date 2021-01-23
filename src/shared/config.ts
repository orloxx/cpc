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
  current: string;
}

export default class Config {
  private static FILE = `${homedir()}/.cpcrc`;
  private static initial: Configuration = {
    contexts: {},
    current: '',
  };

  private static get(): Promise<Configuration> {
    return new Promise((resolve, reject) => {
      readFile(Config.FILE, 'utf8', (err: NodeJS.ErrnoException | null, data: string): void => {
        if (err) {
          resolve(Config.initial);
          return;
        }
        try {
          const jsonConfig: Configuration = JSON.parse(data);
          resolve(jsonConfig);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  private static save(config: Configuration): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const data: string = JSON.stringify(config);
        writeFile(Config.FILE, data, (err: NodeJS.ErrnoException | null): void => {
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
      [context.name]: context,
    };
    await Config.save(config);
  }

  static async getSavedContexts(): Promise<string[]> {
    const config: Configuration = await Config.get();
    return Object.keys(config.contexts);
  }

  static async saveCurrent(current: string): Promise<void> {
    const config: Configuration = await Config.get();
    config.current = current;
    await Config.save(config);
  }

  static async getContext(contextName: string): Promise<Context> {
    const config: Configuration = await Config.get();
    return config.contexts[contextName];
  }
}
