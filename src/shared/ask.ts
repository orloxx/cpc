import Config, { Action, Context } from './config';
import Logger from './logger';

// import is failing
const { Form, AutoComplete, Confirm } = require('enquirer');

export default class Ask {
  static createContext(): Promise<Context> {
    return new Form({
      name: 'createContext',
      message: 'Choose a name and description for your new context:',
      choices: [
        { name: 'name', message: 'Context name', initial: 'awesome-project' },
        { name: 'description', message: 'Description', initial: 'Some awesome project' },
      ],
    }).run();
  }

  static async listContexts(): Promise<string> {
    const savedContexts: string[] = await Config.getSavedContexts();

    if (!savedContexts.length) {
      throw `There are no contexts created yet.\nTry ${Logger.bold('cpc add')}`;
    }

    return new AutoComplete({
      name: 'listContexts',
      message: 'Pick a context configuration',
      choices: savedContexts,
    }).run();
  }

  static createAction(initial?: Action): Promise<Action> {
    const path = initial?.path || '~/some/path/to/directory';
    const command = initial?.command || 'npm run serve';
    const description = initial?.description || 'Describe what your action does';

    const editForm = {
      name: 'createAction',
      message: `Edit '${initial?.name}' action`,
      choices: [
        { name: 'path', message: 'Directory path', initial: path },
        { name: 'command', message: 'Define command', initial: command },
        { name: 'description', message: 'Short description', initial: description },
      ],
    };

    if (!initial) {
      const newForm = {
        ...editForm,
        message: 'Create new action:',
        choices: [
          { name: 'name', message: 'Action name', initial: 'start-server' },
          ...editForm.choices,
        ],
      };
      return new Form(newForm).run();
    }

    return new Form(editForm).run().then((action: Action) => ({
      ...action,
      name: initial?.name,
    }));
  }

  static async isEditAction(): Promise<boolean> {
    return new Confirm({
      name: 'isEditAction',
      message: 'Do you want to edit an existing action?',
    }).run();
  }

  static async listActions(): Promise<string> {
    const currentActions: string[] = await Config.getCurrentActions();

    if (!currentActions.length) {
      throw `There are not actions yet.\nTry ${Logger.bold('cpc edit')}`;
    }

    return new AutoComplete({
      name: 'listActions',
      message: 'Which action?',
      choices: currentActions,
    }).run();
  }
}
