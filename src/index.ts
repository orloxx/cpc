#!/usr/bin/env node

import { CoreAction, coreActions } from './core/core';

const [,, command]:string[] = process.argv;

const coreAction: CoreAction = coreActions[command];

if(coreAction) {
  coreAction.exec();
} else {
  coreActions.help.exec();
}
