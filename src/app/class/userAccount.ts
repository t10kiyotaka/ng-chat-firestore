export class UserAccount {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
  }

  reset() {
    this.name = '';
    this.email = '';
    this.password = '';
  }
}
