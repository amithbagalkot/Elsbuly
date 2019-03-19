import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserMenuAction } from '../../actions/user-menu.action';
import { NgRedux } from '@angular-redux/store';
import { CommonActions } from '../../actions/common.actions';
import { ToastsManager } from 'ng2-toastr';
import { IAppState } from '../../stores';
import { ResolvePathService } from '../../services/resolve-path-service.service';
import { PathConfig, UrlConfig } from '../../config';
import { AuthGuardService } from '../../services/authGuard.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  state ;
  isLoggedIn : boolean = false;
  data;
  constructor(private usermenuaction: UserMenuAction, private ngRedux: NgRedux<IAppState>,
    private resolveService: ResolvePathService, private router: Router, private authGuardService: AuthGuardService) { 
      this.state = JSON.parse(localStorage.getItem('state'));
    }

  ngOnInit() {
   
    this.usermenuaction.userMenu();
    this.ngRedux.subscribe(() => {
      var state = this.ngRedux.getState();
      this.isLoggedIn = this.state.auth.loggedInStatus;
      if(state.usermenu.userMenuData){
        state.common.result=false;
        this.data = state.usermenu.userDataresult;
      }
    }); 
  }
  pathResolve(code) {
    this.resolveService.resolve(code);
}
  get half() {
    return Math.ceil(this.data.length / 3.3);
  }
}
