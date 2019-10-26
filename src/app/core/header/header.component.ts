import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';
import { Session } from '../../class/session';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean;

  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
    this.sessionService.sessionState.subscribe((session: Session) => {
      if (session) {
        this.isLogin = session.isLogin;
      }
      console.log('session: ' + this.isLogin);
    });
  }

  logout() {
    this.sessionService.logout();
  }



}
