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

export function getEditChoices(): EnquirerList {
  return {
    name: 'getEditChoices',
    message: 'What do you want to do?',
    choices: ['Edit existing action', 'Create new one'],
  };
}

export function getRemoveChoices(): EnquirerList {
  return {
    name: 'getRemoveChoices',
    message: 'What are you going to remove?',
    choices: ['Context', 'Action'],
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

export function areYouSure(): EnquirerConfirm {
  return {
    name: 'areYouSure',
    message: 'Are you sure?',
  };
}

export function shouldExportConfig(): EnquirerConfirm {
  return {
    name: 'exportConfigConfirm',
    message: 'Do you want to export this configuration?',
  };
}
