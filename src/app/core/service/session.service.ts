import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Session } from '../../class/session';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  session = new Session();
  sessionSubject = new Subject<Session>();
  sessionState = this.sessionSubject.asObservable();


  constructor(private router: Router) {
  }

  login() {
    this.sessionSubject.next(this.session.login());
    this.router.navigate(['/']);
  }

  logout() {
    this.sessionSubject.next(this.session.reset());
    this.router.navigate(['/account/login']);
  }
}
