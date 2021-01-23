import { CoreAction } from './core';
import Ask from '../shared/ask';
import Config, { Context } from '../shared/config';

export default class Info implements CoreAction {
  async exec(): Promise<void> {
    try {
      const contextName: string = await Ask.listContexts();
      const context: Context = await Config.getContext(contextName);
      console.log(context);
    } catch (e) {
      console.error(e);
    }
  }

  summary(): string {
    return 'Prints out information about a context configuration';
  }
}
