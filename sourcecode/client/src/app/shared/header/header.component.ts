import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../stores';
import { LoginActions } from '../../actions/authLogin.actions';
import { Router } from '@angular/router';
import { UrlConfig } from '../../config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  images_icon: any = "assets/images/settings_icon.png";
  images_search: any = "assets/images/logo_in.png";
  images_logo: any = "assets/images/search_icon.png";
  status;

  constructor(private ngRedux: NgRedux<IAppState>, private loginAction: LoginActions, private router: Router) {
    this.state = JSON.parse(localStorage.getItem('state'))
   this.name =  this.state.auth.userinfo.user_name;
   this.status = this.state.auth.userinfo.user_type_id;
  }
  state: any;
  name: string;

  ngOnInit() {
    this.ngRedux.subscribe(()=>{
      var state = this.ngRedux.getState();
    //  this.name = state.auth.userinfo.email_id;
      if(state.auth.loggedOut){
        state.auth.loggedOut = false;
        localStorage.clear();
        this.router.navigateByUrl(UrlConfig.LOGIN);
      }
    })
  }
  logOut(){
    this.loginAction.logOutUser();
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl(UrlConfig.LOGIN);
    window.location.reload();
  }
}