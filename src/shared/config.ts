import { writeFile, readFile } from 'fs';
import { homedir } from 'os';
import Logger from './logger';
import { Context, Contexts } from '../models/context';
import { Action, INITIAL_ACTION } from '../models/action';

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
      [context.name]: {
        ...context,
        actions: { ...context.actions },
      },
    };
    await Config.save(config);
    console.log(`\tContext ${Logger.bold(context.name)} saved!`);
  }

  static async getSavedContexts(): Promise<string[]> {
    const config: Configuration = await Config.get();
    return Object.keys(config.contexts);
  }

  static async saveCurrent(current: string): Promise<void> {
    const config: Configuration = await Config.get();
    config.current = current;
    await Config.save(config);
    console.log(`\tNow using ${Logger.bold(current)} context`);
  }

  static async getContext(contextName: string): Promise<Context> {
    const config: Configuration = await Config.get();
    return config.contexts[contextName];
  }

  static async getCurrent(): Promise<Context> {
    const config: Configuration = await Config.get();

    if (!config.current) {
      throw `There is no context selected.\nTry: ${Logger.bold('cpc use')}`;
    }

    return config.contexts[config.current];
  }

  static sanitizeAction(action: Action): Action {
    const { path } = INITIAL_ACTION;
    return {
      ...action,
      path: action.path === path ? '' : action.path,
    };
  }

  static async saveAction(contextName: string, action: Action): Promise<void> {
    const cleanAction: Action = Config.sanitizeAction(action);
    const config: Configuration = await Config.get();
    config.contexts[contextName].actions = {
      ...config.contexts[contextName].actions,
      [cleanAction.name]: cleanAction,
    };
    await Config.save(config);
    console.log(`\tAction ${Logger.bold(cleanAction.name)} saved!`);
  }

  static async getAction(actionName: string): Promise<Action> {
    const current: Context = await Config.getCurrent();
    return current.actions[actionName];
  }

  static async removeContext(contextName: string): Promise<void> {
    const config: Configuration = await Config.get();
    delete config.contexts[contextName];

    if (config.current === contextName) {
      config.current = '';
    }

    await Config.save(config);
    console.log(`Context ${Logger.bold(contextName)} was successfully removed!`);
  }

  static async removeAction(actionName: string): Promise<void> {
    const current: Context = await Config.getCurrent();
    const { name: contextName } = current;
    const config: Configuration = await Config.get();
    delete config.contexts[contextName].actions[actionName];

    await Config.save(config);
    console.log(`Action ${Logger.bold(actionName)} was successfully removed!`);
  }
}
