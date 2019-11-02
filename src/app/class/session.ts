import { User } from './chat';

export class Session {
  isLogin: boolean;
  user: User;

  constructor() {
    this.isLogin = false;
    this.user = new User();
  }

  login(): Session {
    this.isLogin = true;
    return this;
  }

  reset(): Session {
    this.isLogin = false;
    this.user = new User();
    return this;
  }
}
