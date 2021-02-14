import { Actions } from './action';
import { EnquirerForm, EnquirerList } from './enquirer';

export interface Context {
  name: string;
  description: string;
  actions: Actions;
}

export interface Contexts {
  [contextName: string]: Context;
}

export function getContextForm(): EnquirerForm {
  return {
    name: 'contextForm',
    message: 'Choose a name and description for your new context:',
    choices: [
      { name: 'name', message: 'Context name', initial: 'awesome-project' },
      { name: 'description', message: 'Description', initial: 'Some awesome project' },
    ],
  };
}

export function getContextAutocomplete(list: string[]): EnquirerList {
  return {
    name: 'contextAutocomplete',
    message: 'Pick a context configuration',
    choices: list,
  };
}
