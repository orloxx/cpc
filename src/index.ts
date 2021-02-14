#!/usr/bin/env node

import { CoreAction, coreActions } from './core-actions';
import Config from './shared/config';
import Run from './core-actions/run';
import { Action } from './models/action';

async function startProgram(): Promise<void> {
  const [, , command]: string[] = process.argv;
  const coreAction: CoreAction = coreActions[command];

  if (coreAction) {
    await coreAction.exec();
    return;
  }

  try {
    const action: Action = await Config.getAction(command);
    if (action) {
      const runAction: Run = new Run();
      runAction.run(action);
      return;
    }
  } catch (e) {}

  await coreActions.help.exec();
}

startProgram();
