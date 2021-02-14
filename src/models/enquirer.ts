export interface EnquirerForm {
  name: string;
  message: string;
  choices: {
    name: string;
    message: string;
    initial: string;
  }[];
}

export interface EnquirerList {
  name: string;
  message: string;
  choices: string[];
}

export interface EnquirerConfirm {
  name: string;
  message: string;
}
