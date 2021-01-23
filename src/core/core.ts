import Add from './add';
import Help from './help';
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
  use: new Use(),
};
