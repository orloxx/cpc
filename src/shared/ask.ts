import { Context } from './config';

// import is failing
const { Form } = require('enquirer');

export default class Ask {
  static createContext(): Promise<Context> {
    return new Form({
      name: 'context',
      message: 'Choose a name and description for your new context:',
      choices: [
        { name: 'name', message: 'Context name', initial: 'awesome-project' },
        { name: 'description', message: 'Description', initial: 'Some awesome project' },
      ]
    }).run();
  }
}
