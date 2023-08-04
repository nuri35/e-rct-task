export interface SigninInput {
  email: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

export interface AccountCrInput {
  accountName: string;
  accountEmail: string;
  accountTitle: string;
  accountIdtaxNumber: string;
  accountPhone: string;
  accountAddress: string;
  accountCountry: string;
}

export interface AccountUpInput {
  accountName?: string;
  accountEmail: string;
  accountTitle?: string;
  accountIdtaxNumber: string;
  accountPhone?: string;
  accountAddress?: string;
  accountCountry?: string;
}
