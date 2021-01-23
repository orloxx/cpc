import { CoreAction } from './core';
import Ask from '../shared/ask';
import Config from '../shared/config';
import Logger from '../shared/logger';

export default class Remove implements CoreAction {
  async exec(): Promise<void> {
    try {
      const contextName: string = await Ask.listContexts();
      await Config.removeContext(contextName);
      console.log(`Context '${Logger.bold(contextName)}' was successfully removed!`);
    } catch (e) {
      console.error(e);
    }
  }

  summary(): string {
    return 'Removes existing context configuration';
  }
}
