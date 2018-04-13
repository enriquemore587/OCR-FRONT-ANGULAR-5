import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { GLOBAL } from '../../services/global';
import { UserService } from  '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;

  constructor(
    private _userService: UserService
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
          localStorage.setItem('auth',response.data.token);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
