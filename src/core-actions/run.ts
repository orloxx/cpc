import { spawn } from 'child_process';
import { CoreAction } from './';
import Ask from '../shared/ask';
import Config from '../shared/config';
import { Action } from '../models/action';
import Logger from '../shared/logger';

export default class Run implements CoreAction {
  async exec(args: string[] = []): Promise<void> {
    try {
      let [actionName]: string[] = args;

      if (!actionName) {
        actionName = await Ask.listActions();
      }

      const action: Action = await Config.getAction(actionName);

      if (action) {
        this.run(action);
      } else {
        console.error(`Action ${Logger.bold(actionName)} does not exist`);
      }
    } catch (e) {
      console.error(e);
    }
  }

  summary(): string {
    return 'Runs one of the actions from the current context configuration';
  }

  run({ path, command }: Action): void {
    const endCommand: string = path ? `cd ${path} && ${command}` : command;

    console.log(`Executing: ${endCommand}\n`);

    const p = spawn(endCommand, {
      shell: true,
      stdio: 'inherit',
    });
    p.on('close', () => {
      console.log(`\nAction finished!`);
    });
  }
}
