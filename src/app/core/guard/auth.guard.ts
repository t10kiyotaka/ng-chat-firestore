import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from '../service/session.service';
import { Session } from '../../class/session';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(private sessionService: SessionService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sessionService.checkLoginState()
      .pipe(
        map((session: Session) => {
          // If Not Login, navigate to Login view.
          if (!session.isLogin) {
            this.router.navigate(['/account/login']);
          }
          return session.isLogin;
        })
      );
  }
}
