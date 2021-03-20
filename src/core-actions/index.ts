import Add from './add';
import Edit from './edit';
import Help from './help';
import Info from './info';
import Load from './load';
import Remove from './remove';
import Run from './run';
import Use from './use';

export interface CoreAction {
  exec(args?: string[]): Promise<void>;
  summary(): string;
}

export interface CoreActions {
  [propName: string]: CoreAction;
}

export const coreActions: CoreActions = {
  help: new Help(),
  add: new Add(),
  load: new Load(),
  edit: new Edit(),
  use: new Use(),
  info: new Info(),
  remove: new Remove(),
  run: new Run(),
};
