import Config from './config';
import Logger from './logger';
import { Context, getContextAutocomplete, getContextForm } from '../models/context';
import {
  Action,
  getActionsAutocomplete,
  getConfirmEditAction,
  getConfirmNewAction,
  getEditActionForm,
  getNewActionForm,
} from '../models/action';

// import is failing
const { Form, AutoComplete, Confirm } = require('enquirer');

export default class Ask {
  static async createContext(): Promise<Context> {
    const newContext: Context = await new Form(getContextForm()).run();
    Logger.contextInfo(newContext);
    return newContext;
  }

  static async listContexts(): Promise<string> {
    const savedContexts: string[] = await Config.getSavedContexts();

    if (!savedContexts.length) {
      throw `There are no contexts created yet.\nTry ${Logger.bold('cpc add')}`;
    }

    return new AutoComplete(getContextAutocomplete(savedContexts)).run();
  }

  static async isCreateAction(): Promise<boolean> {
    return new Confirm(getConfirmNewAction()).run();
  }

  static async createAction(): Promise<Action> {
    return new Form(getNewActionForm()).run();
  }

  static async editAction(initial: Action): Promise<Action> {
    const action: Action = await new Form(getEditActionForm(initial))
      .run()
      .then((action: Action) => ({
        ...action,
        name: initial.name,
      }));
    Logger.actionInfo(action);
    return action;
  }

  static async isEditAction(): Promise<boolean> {
    return new Confirm(getConfirmEditAction()).run();
  }

  static async listActions(): Promise<string> {
    const currentContext: Context = await Config.getCurrent();
    const currentActions: string[] = Object.keys(currentContext.actions);

    if (!currentActions.length) {
      throw `There are not actions yet.\nTry ${Logger.bold('cpc edit')}`;
    }
    console.log(`Running ${Logger.bold(currentContext.name)} context`);

    return new AutoComplete(getActionsAutocomplete(currentActions)).run();
  }
}
