export interface IAuth {
  email: string;
  password: string;
  remember?: boolean;
}

export interface IAuthRegister extends IAuth {
  firstname: string;
  lastname: string;
  password_confirmation?: string;
}