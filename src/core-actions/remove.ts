import { CoreAction } from './';
import Ask from '../shared/ask';
import Config from '../shared/config';
import { areYouSure, getRemoveChoices } from '../models/action';

export default class Remove implements CoreAction {
  async exec(): Promise<void> {
    try {
      const removeChoice: string = await Ask.removeChoice();
      if (removeChoice === getRemoveChoices().choices[0]) {
        const contextName: string = await Ask.listContexts();
        await Ask.confirm(areYouSure, () => Config.removeContext(contextName));
      } else {
        const actionName: string = await Ask.listActions();
        await Ask.confirm(areYouSure, () => Config.removeAction(actionName));
      }
    } catch (e) {
      console.error(e);
    }
  }

  summary(): string {
    return 'Removes existing context configuration';
  }
}
