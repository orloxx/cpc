import { CoreAction } from './';
import Config from '../shared/config';
import Ask from '../shared/ask';
import { Context } from '../models/context';
import Run from './run';

export default class Use implements CoreAction {
  async exec(): Promise<void> {
    try {
      const contextName: string = await Ask.listContexts();
      const current: Context = await Config.saveCurrent(contextName);

      if (current.actions.postuse) {
        const runAction: Run = new Run();
        runAction.run(current.actions.postuse);
      }
    } catch (e) {
      console.error(e);
    }
  }

  summary(): string {
    return 'Changes between existing context configurations';
  }
}
