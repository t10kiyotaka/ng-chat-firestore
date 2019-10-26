export class Session {
  isLogin: boolean;

  constructor() {
    this.isLogin = false;
  }

  reset(): Session {
    this.isLogin = false;
    return this;
  }
}
