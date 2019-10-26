import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SessionService } from '../../core/service/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;


  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  login() {
    this.sessionService.login();
  }

}
