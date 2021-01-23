import { CoreAction, coreActions } from './core';
import Logger from '../shared/logger';
import Config, { Context } from '../shared/config';

export default class Help implements CoreAction {
  async exec(): Promise<void> {
    console.log();
    Help.title();
    await Help.currentActions();
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

  private static async currentActions(): Promise<void> {
    try {
      const context: Context = await Config.getCurrent();
      console.log(`Current project: ${Logger.bold(context.name)}\n`);
      const actions: string[] | undefined = context.actions && Object.keys(context.actions);
      if (actions && actions.length) {
        console.log('List of available actions:\n');
        actions.forEach((action: string) => {
          console.log(`\t${Logger.bold(action)}`);
        });
      } else {
        console.log(`You have no actions created. Try ${Logger.bold('cpc edit')}`);
      }
      console.log();
    } catch (e) {}
  }

  private static coreActions(): void {
    console.log('List of available commands:\n');
    Object.keys(coreActions).forEach((action: string) => {
      console.log(
        `\t${Logger.bold(action).padEnd(20)} ${Logger.dim(coreActions[action].summary())}`,
      );
    });
    console.log();
  }

  private static examples(): void {
    console.log('Example:\n');
    console.log('\tcpc add');
  }
}
