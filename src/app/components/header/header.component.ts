import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [UserService]
})
export class HeaderComponent implements OnInit, DoCheck{
  public title: String;
  public auth;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
    this.title = "O. C. R. 2018";
  }

  ngOnInit(){
    this.auth = this._userService.getAuth();
    this._router.navigate(['/']);
  }

  ngDoCheck(){
    this.auth = this._userService.getAuth();
  }

  logOut() {
    localStorage.clear();
    this._router.navigate(['/']);
  }

}
