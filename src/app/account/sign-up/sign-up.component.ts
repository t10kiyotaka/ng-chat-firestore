import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { SessionService } from '../../core/service/session.service';
import { User } from '../../class/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide = true;
  user = new User();


  constructor(private sessionService: SessionService) {
  }

  ngOnInit() {
  }

  getErrorMessageForEmail() {
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
    return this.name.valid && this.email.valid && this.password.valid;
  }

  signUp(e: Event) {
    e.preventDefault();
    this.sessionService.signup(this.user);
  }

}
