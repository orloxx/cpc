import Config, { Context } from './config';

// import is failing
const { Form, AutoComplete } = require('enquirer');

export default class Ask {
  static createContext(): Promise<Context> {
    return new Form({
      name: 'context',
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
      throw 'There are no contexts created yet.\nTry creating one!';
    }

    return new AutoComplete({
      name: 'context',
      message: 'Pick a context configuration',
      choices: savedContexts,
    }).run();
  }
}
