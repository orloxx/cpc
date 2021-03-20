import { EnquirerChoice, EnquirerConfirm, EnquirerForm, EnquirerList } from './enquirer';

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

export function getConfirmRemoveAction(): EnquirerConfirm {
  return {
    name: 'isRemoveAction',
    message: 'Do you want to remove an existing action?',
  };
}

export function getActionsAutocomplete(list: string[]): EnquirerList {
  return {
    name: 'listActions',
    message: 'Which action?',
    choices: list,
  };
}

function getActionChoices(initial: Action): EnquirerChoice[] {
  const { name, path, command, description }: Action = initial;
  return [
    { name: 'name', message: 'Action name', initial: name },
    { name: 'path', message: 'Directory path', initial: path },
    { name: 'command', message: 'Define command', initial: command },
    { name: 'description', message: 'Short description', initial: description },
  ];
}

export function getEditActionForm(action: Action): EnquirerForm {
  const { name }: Action = action;
  return {
    name: 'editAction',
    message: `Edit '${name}' action`,
    choices: getActionChoices(action).filter((item) => item.name !== 'name'),
  };
}

export const INITIAL_ACTION: Action = {
  name: 'hello-world',
  path: 'no path',
  command: 'echo "hello world"',
  description: 'Prints "hello world"',
};

export function getNewActionForm(): EnquirerForm {
  return {
    name: 'newAction',
    message: 'Create new action:',
    choices: getActionChoices(INITIAL_ACTION),
  };
}
