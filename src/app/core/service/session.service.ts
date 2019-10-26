import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  isLogin: boolean;

  constructor() {
    this.isLogin = false;
  }
}
