import { CoreAction } from './core';
import Config from '../shared/config';
import Ask from '../shared/ask';

export default class Use implements CoreAction {
  async exec(): Promise<void> {
    try {
      const contextName: string = await Ask.listContexts();
      await Config.saveCurrent(contextName);
    } catch (e) {
      console.error(e);
    }
  }

  summary(): string {
    return 'Changes between existing context configurations';
  }
}
