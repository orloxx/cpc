import { CoreAction } from './';
import Ask from '../shared/ask';
import Config from '../shared/config';
import Logger from '../shared/logger';
import { Context } from '../models/context';
import { Action } from '../models/action';

export default class Edit implements CoreAction {
  async exec(): Promise<void> {
    try {
      const current: Context = await Config.getCurrent();
      console.log(`Editing ${Logger.bold(current.name)} context`);

      let newAction: Action;
      if (current.actions && Object.keys(current.actions).length) {
        const isEdit: boolean = await Ask.isEditAction();
        if (isEdit) {
          const actionName: string = await Ask.listActions();
          const action: Action = await Config.getAction(actionName);
          newAction = await Ask.editAction(action);
        } else {
          newAction = await Ask.createAction();
        }
      } else {
        newAction = await Ask.createAction();
      }

      await Config.saveAction(current.name, newAction);
    } catch (e) {
      console.error(e);
    }
  }

  summary(): string {
    return 'Edits the current context configuration';
  }
}
