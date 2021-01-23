import { spawn } from 'child_process';
import { CoreAction } from './core';
import Ask from '../shared/ask';
import Config, { Action } from '../shared/config';

export default class Run implements CoreAction {
  async exec(): Promise<void> {
    try {
      const actionName: string = await Ask.listActions();
      const action: Action = await Config.getAction(actionName);
      this.run(action.path, action.command);
    } catch (e) {
      console.error(e);
    }
  }

  summary(): string {
    return 'Runs one of the actions from the current context configuration';
  }

  run(path: string, command: string): void {
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
