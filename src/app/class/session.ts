export class Session {
  isLogin: boolean;

  constructor() {
    this.isLogin = false;
  }

  login(): Session {
    this.isLogin = true;
    return this;
  }

  reset(): Session {
    this.isLogin = false;
    return this;
  }
}
