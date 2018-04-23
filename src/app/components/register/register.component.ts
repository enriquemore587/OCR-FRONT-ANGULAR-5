import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { GLOBAL } from '../../services/global';
import { UserService } from  '../../services/user.service';

import { Router, ActivatedRoute, Params} from '@angular/router';
import { FormsModule, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  pwdFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.user = new User('','');
  }

  ngOnInit() {
    this._userService.getAuth();
  }
  onSubmit(registerForm){
    this._userService.register(this.user).subscribe(
      response => {
        if(response.status == 0){ 
          registerForm.reset();
          localStorage.setItem('auth', response.data.token);
          localStorage.setItem('email', this.user.email);
          this._router.navigate(['/']);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
