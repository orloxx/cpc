import { CoreAction } from './';
import Ask from '../shared/ask';
import Config from '../shared/config';
import Logger from '../shared/logger';
import { Context } from '../models/context';

export default class Info implements CoreAction {
  async exec(): Promise<void> {
    try {
      const contextName: string = await Ask.listContexts();
      const context: Context = await Config.getContext(contextName);
      Logger.contextInfo(context);

      console.log('\n\tActions:');
      Object.keys(context.actions).forEach((actionName: string) => {
        console.log();
        Logger.actionInfo(context.actions[actionName]);
      });
    } catch (e) {
      console.error(e);
    }
  }

  summary(): string {
    return 'Prints out information about a context configuration';
  }
}
