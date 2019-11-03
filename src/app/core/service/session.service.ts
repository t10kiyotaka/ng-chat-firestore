import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Session } from '../../class/session';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserAccount } from '../../class/userAccount';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../class/chat';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  session = new Session();
  sessionSubject = new Subject<Session>();
  sessionState = this.sessionSubject.asObservable();


  constructor(private router: Router,
              private angularFireAuth: AngularFireAuth,
              private afStore: AngularFirestore) {}

  next() {
    this.sessionSubject.next(this.session);
  }

  login(user: UserAccount): void {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(user.email, user.password)
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

  logout(): void {
    this.angularFireAuth
      .auth.signOut()
      .then(() => {
        return this.router.navigate(['/account/login']);
      })
      .then(() => {
        this.sessionSubject.next(this.session.reset());
        alert('Logged out.');
      })
      .catch(err => {
        console.log(err);
        alert('Failed to logout.\n' + err);
      });
  }

  signup(user: UserAccount): void {
    let auth;
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(authUser => {
        auth = authUser;
        return auth.user.sendEmailVerification();
      })
      .then(() => {
        return this.createUser(new User(auth.user.uid, user.name));
      })
      .then(() => {
        this.angularFireAuth.auth.signOut();
      })
      .then(() => {
        user.reset();
        alert('Sent confirmation mail');
      })
      .catch( err => {
        console.log(err);
        alert('Failed to create an account.\n' + err);
      });
  }


  checkLoginState(): Observable<Session> {
    return this.angularFireAuth
      .authState.pipe(map(auth => {
        this.session.isLogin = !!auth;
        return this.session;
    }));
  }

  checkLogin(): void {
    this.angularFireAuth
      .authState
      .pipe(
        switchMap(auth => {
          if (auth) {
            return this.getUser(auth.uid);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(auth => {
        this.session.isLogin = !!auth;
        this.session.user = auth ? auth : new User();
        this.sessionSubject.next(this.session);
      });
  }

  isCurrentUser(targetUId: string) {
    return this.angularFireAuth.authState.subscribe(auth => {
      return auth.uid === targetUId;
    });
  }

  private createUser(user: User): Promise<void> {
    return this.afStore
      .collection('users')
      .doc(user.uid)
      .set(user.deserialize());
  }

  private getUser(uid: string): Observable<any> {
    return this.afStore
      .collection('users')
      .doc(uid)
      .valueChanges()
      .pipe(
        take(1),
        switchMap((user: User) =>
          of(new User(uid, user.name)))
      );
  }

}
