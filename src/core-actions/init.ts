import { CoreAction } from './';
import Config from '../shared/config';
import Ask from '../shared/ask';
import { Context } from '../models/context';
import { Action } from '../models/action';

export default class Init implements CoreAction {
  async exec(): Promise<void> {
    try {
      const context: Context = await Ask.createContext();
      await Config.saveContext(context);

      while (await Ask.isCreateAction()) {
        const action: Action = await Ask.createAction();
        await Config.saveAction(context.name, action);
      }

      const newContext: Context = await Config.getContext(context.name);
      await Config.export(newContext);
    } catch (e) {
      console.error(e);
    }
  }

  summary(): string {
    return 'Creates a new context configuration';
  }
}
