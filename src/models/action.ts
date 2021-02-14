import { EnquirerConfirm, EnquirerForm, EnquirerList } from './enquirer';

export interface Action {
  name: string;
  path: string;
  command: string;
  description: string;
}

export interface Actions {
  [actionName: string]: Action;
}

export function getConfirmNewAction(): EnquirerConfirm {
  return {
    name: 'isCreateAction',
    message: 'Add a new action?',
  };
}

export function getConfirmEditAction(): EnquirerConfirm {
  return {
    name: 'isEditAction',
    message: 'Do you want to edit an existing action?',
  };
}

export function getActionsAutocomplete(list: string[]): EnquirerList {
  return {
    name: 'listActions',
    message: 'Which action?',
    choices: list,
  };
}

export function getEditActionForm(action: Action): EnquirerForm {
  return {
    name: 'editAction',
    message: `Edit '${action.name}' action`,
    choices: [
      { name: 'path', message: 'Directory path', initial: action.path },
      { name: 'command', message: 'Define command', initial: action.command },
      { name: 'description', message: 'Short description', initial: action.description },
    ],
  };
}

export const INITIAL_ACTION: Action = {
  name: 'start-server',
  path: '~/some/path/to/directory',
  command: 'npm run serve',
  description: 'Describe what your action does',
};

export function getNewActionForm(): EnquirerForm {
  const { name, path, command, description }: Action = INITIAL_ACTION;
  return {
    name: 'newAction',
    message: 'Create new action:',
    choices: [
      { name: 'name', message: 'Action name', initial: name },
      { name: 'path', message: 'Directory path', initial: path },
      { name: 'command', message: 'Define command', initial: command },
      { name: 'description', message: 'Short description', initial: description },
    ],
  };
}
