import * as moment from 'moment';

export class User {
  uid: number;
  name: string;

  constructor(uid: number, name: string) {
    this.uid = uid;
    this.name = name;
  }

  desirialize() {
    return Object.assign({}, this);
  }
}


export class Comment {
  user: User;
  initial: string;
  content: string;
  date: number;

  constructor(user: User, content: string) {
    this.user = user;
    this.initial = user.name.slice(0, 1);
    this.content = content;
    this.date = +moment();
  }

  desirialize() {
    this.user = this.user.desirialize();
    return Object.assign({}, this);
  }

  setData(date: number): Comment {
    this.date = date;
    return this;
  }
}
