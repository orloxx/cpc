import { CoreAction } from './core';
import Config, { Action, Context } from '../shared/config';
import Ask from '../shared/ask';

export default class Add implements CoreAction {
  async exec(): Promise<void> {
    try {
      const context: Context = await Ask.createContext();
      await Config.saveContext(context);

      while (await Ask.isCreateAction()) {
        const action: Action = await Ask.createAction();
        await Config.saveAction(context.name, action);
      }
    } catch (e) {
      console.error(e);
    }
  }

  summary(): string {
    return 'Creates a new context configuration';
  }
}
