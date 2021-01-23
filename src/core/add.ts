import { CoreAction } from './core';
import Config, { Context } from '../shared/config';
import Ask from '../shared/ask';

export default class Add implements CoreAction {
  async exec(): Promise<void> {
    try {
      const context: Context = await Ask.createContext();
      await Config.saveContext(context);
      console.log('New context created!');
    } catch (e) {
      console.error(e);
    }
  }

  summary(): string {
    return 'Creates a new context configuration';
  }
}
