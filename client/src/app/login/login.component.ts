import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: object
  errorMsg: string
  userName: string
  constructor(private _mainService: MainService, private _router: Router) {
    this.user = { name: '' }
    this.errorMsg = "";
  }
  login() {
    this.user['name'] = this.user['name'].trim();
    if (this.user['name'].length > 2) {
      this.errorMsg = "";
      this._mainService.login(this.user, (data) => {
        this._router.navigate(['dashboard']);
      })
    }
    else {
      this.errorMsg = "Name must be at least two characters."
    }
  }
  ngOnInit() {
    this._mainService.CheckSession((userName) => {
      if (userName['user']) {
        this.userName = userName['user'];
        this._router.navigate(['dashboard']);
      } else {
        this._router.navigate(['/']);
      }
    })
  }

}
