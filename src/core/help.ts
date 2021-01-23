import { CoreAction, coreActions } from './core';
import Logger from '../shared/logger';

export default class Help implements CoreAction {
  async exec(): Promise<void> {
    console.log();
    Help.title();
    Help.coreActions();
    Help.examples();
    console.log();
  }

  summary(): string {
    return 'Displays this screen';
  }

  private static title(): void {
    console.log(' ██████╗██████╗  ██████╗');
    console.log('██╔════╝██╔══██╗██╔════╝');
    console.log('██║     ██████╔╝██║');
    console.log('██║     ██╔═══╝ ██║');
    console.log('╚██████╗██║     ╚██████╗');
    console.log(' ╚═════╝╚═╝      ╚═════╝\n');
    console.log('A program to easily change context between projects.\n');
  }

  private static coreActions(): void {
    console.log('List of available commands:\n');
    Object.keys(coreActions).forEach((action: string) => {
      console.log(
        `\t${Logger.bold(action).padEnd(20)} ${Logger.dim(coreActions[action].summary())}`,
      );
    });
  }

  private static examples(): void {
    console.log('\nExample:\n');
    console.log('\tcpc add');
  }
}
