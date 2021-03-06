import { CoreAction, coreActions } from './';
import Logger from '../shared/logger';
import Config from '../shared/config';
import { Context } from '../models/context';

export const HELP_TYPES = {
  compact: 'compact',
};

export default class Help implements CoreAction {
  async exec(args: string[] = []): Promise<void> {
    const [type]: string[] = args;

    console.log();
    if (type !== HELP_TYPES.compact) {
      Help.title();
    }

    await Help.currentActions();

    if (type !== HELP_TYPES.compact) {
      Help.coreActions();
      Help.examples();
    }
  }

  summary(): string {
    return 'Displays this screen';
  }

  private static title(): void {
    // import is failing
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require('../../package.json');
    console.log(' ██████╗██████╗  ██████╗');
    console.log('██╔════╝██╔══██╗██╔════╝');
    console.log('██║     ██████╔╝██║');
    console.log('██║     ██╔═══╝ ██║');
    console.log('╚██████╗██║     ╚██████╗');
    console.log(` ╚═════╝╚═╝      ╚═════╝ v${pkg.version}\n`);
    console.log('A program to easily change context between projects.\n');
  }

  private static async currentActions(): Promise<void> {
    try {
      const context: Context = await Config.getCurrent();
      console.log(`Current context: ${Logger.underline(Logger.bold(context.name))}\n`);
      const actions: string[] = Object.keys(context.actions);
      if (actions && actions.length) {
        console.log('List of available actions:\n');
        actions.forEach((action: string) => {
          console.log(
            `\t${Logger.bold(action)} ${Logger.dim(context.actions[action].description)}`,
          );
        });
      } else {
        console.log(`You have no actions created. Try ${Logger.bold('cpc edit')}`);
      }
      console.log();
    } catch (e) {
      console.log(e);
    }
  }

  private static coreActions(): void {
    console.log('List of available commands:\n');
    Object.keys(coreActions).forEach((action: string) => {
      console.log(`\t${Logger.bold(action)} ${Logger.dim(coreActions[action].summary())}`);
    });
    console.log();
  }

  private static examples(): void {
    console.log('Examples:\n');
    console.log('\tcpc init');
    console.log('\tcpc use');
    console.log();
  }
}
