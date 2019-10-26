import { Component, OnInit } from '@angular/core';
import { SessionService } from '../service/session.service';

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
    this.isLogin = this.sessionService.isLogin;
    console.log('header-component-login' + this.isLogin);
  }



}
