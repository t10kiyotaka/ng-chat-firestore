import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SessionService } from '../../core/service/session.service';
import { UserAccount } from '../../class/userAccount';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide = true;
  user = new UserAccount();


  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getErrorMessageForPassword() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('minlength') ? 'Password must be at least 6 characters.' :
        '';
  }


  isValid() {
    return this.email.valid && this.password.valid;
  }

  login(e: Event) {
    e.preventDefault();
    this.sessionService.login(this.user);
  }

}
