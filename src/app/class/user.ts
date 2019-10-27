export class User {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
  }

  reset() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.passwordConfirmation = '';
  }
}
