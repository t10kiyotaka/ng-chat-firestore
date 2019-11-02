import * as moment from 'moment';

export class User {
  uid: string;
  name: string;

  constructor(uid?: string, name?: string) {
    this.uid = uid ? uid : '';
    this.name = name ? name : '';
  }

  deserialize() {
    return Object.assign({}, this);
  }
}


export class Comment {
  user: User;
  initial: string;
  content: string;
  date: number;
  key?: string;
  editFlag?: boolean;

  constructor(user: User, content: string) {
    this.user = user;
    this.initial = user.name.slice(0, 1);
    this.content = content;
    this.date = +moment();
  }

  deserialize() {
    this.user = this.user.deserialize();
    return Object.assign({}, this);
  }

  setData(date: number, key: string): Comment {
    this.date = date;
    this.key = key;
    return this;
  }
}
