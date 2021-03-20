import { CoreAction } from './';
import Ask from '../shared/ask';
import Config from '../shared/config';

export default class Remove implements CoreAction {
  async exec(): Promise<void> {
    try {
      const isRemove: boolean = await Ask.isRemoveAction();
      if (isRemove) {
        const actionName: string = await Ask.listActions();
        await Config.removeAction(actionName);
      } else {
        const contextName: string = await Ask.listContexts();
        await Config.removeContext(contextName);
      }
    } catch (e) {
      console.error(e);
    }
  }

  summary(): string {
    return 'Removes existing context configuration';
  }
}
