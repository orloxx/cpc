import Config from './config';
import Logger from './logger';
import { Context, getContextAutocomplete, getContextForm } from '../models/context';
import {
  Action,
  getActionsAutocomplete,
  getEditChoices,
  getConfirmNewAction,
  getRemoveChoices,
  getEditActionForm,
  getNewActionForm,
} from '../models/action';
import { EnquirerConfirm } from '../models/enquirer';

// import is failing
// eslint-disable-next-line @typescript-eslint/no-var-requires
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
      throw `There are no contexts created yet.\nTry ${Logger.bold('cpc init')}`;
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

  static async editChoice(): Promise<string> {
    return new AutoComplete(getEditChoices()).run();
  }

  static async removeChoice(): Promise<string> {
    return new AutoComplete(getRemoveChoices()).run();
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

  static async confirm(
    question: () => EnquirerConfirm,
    callback: () => Promise<void>,
  ): Promise<void> {
    const response = await new Confirm(question()).run();
    if (response === true) {
      await callback();
    }
  }
}
