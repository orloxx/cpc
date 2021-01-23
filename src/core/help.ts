import { CoreAction, coreActions } from './core';

export default class Help implements CoreAction {
  async exec(): Promise<void> {
    Help.title();
    Help.overview();
  }

  summary(): string {
    return 'Displays this screen';
  }

  private static title(): void {
    console.log('\n ██████╗██████╗  ██████╗');
    console.log('██╔════╝██╔══██╗██╔════╝');
    console.log('██║     ██████╔╝██║');
    console.log('██║     ██╔═══╝ ██║');
    console.log('╚██████╗██║     ╚██████╗');
    console.log(' ╚═════╝╚═╝      ╚═════╝\n');
  }

  private static overview(): void {
    console.log('A program to easily change context between projects.\n');
    console.log('List of available commands:\n');
    Object.keys(coreActions).forEach((action: string) => {
      console.log(`\t- ${action}: ${coreActions[action].summary()}`);
    });
    console.log();
  }
}
