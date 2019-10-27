import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Session } from '../../class/session';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Password } from '../../class/password';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  session = new Session();
  sessionSubject = new Subject<Session>();
  sessionState = this.sessionSubject.asObservable();


  constructor(private router: Router,
              private angularFireAuth: AngularFireAuth) {
  }

  login(account: Password) {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(account.email, account.password)
      .then(auth => {
        // Check whether email confirmation is done.
        if (!auth.user.emailVerified) {
          this.angularFireAuth.auth.signOut();
          return Promise.reject('Please complete email confirmation.');
        } else {
          this.session.isLogin = true;
          this.sessionSubject.next(this.session);
          return this.router.navigate(['/']);
        }
      })
      .then(() => alert('Successfully logged in.'))
      .catch(err => {
        console.log(err);
        alert('Failed to login.\n' + err);
      });
  }

  logout() {
    this.angularFireAuth
      .auth.signOut()
      .then(() => {
        this.sessionSubject.next(this.session.reset());
        return this.router.navigate(['/account/login']);
      })
      .then(() => {
        alert('Logged out.');
      })
      .catch(err => {
        console.log(err);
        alert('Failed to logout.\n' + err);
      });
  }

  signup(account: Password) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(account.email, account.password)
      .then(auth => auth.user.sendEmailVerification())
      .then(() => alert('Send confirmation mail.'))
      .catch( err => {
        console.log(err);
        alert('Failed to create an account.\n' + err);
      });
  }
}
