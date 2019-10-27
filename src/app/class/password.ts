export class Password {
  email: string;
  password: string;
  passwordConfirmation: string;

  constructor() {
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
  }

  reset() {
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
  }
}
