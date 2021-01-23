import Add from './add';
import Edit from './edit';
import Help from './help';
import Info from './info';
import Use from './use';

export interface CoreAction {
  exec(): Promise<void>;
  summary(): string;
}

export interface CoreActions {
  [propName: string]: CoreAction;
}

export const coreActions: CoreActions = {
  help: new Help(),
  add: new Add(),
  edit: new Edit(),
  use: new Use(),
  info: new Info(),
};
