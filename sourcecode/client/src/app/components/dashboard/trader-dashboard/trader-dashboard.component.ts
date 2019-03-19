import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores';
import { UserMenuAction } from '../../../actions/user-menu.action';
import { Router } from '@angular/router';
import { UrlConfig } from '../../../config';
import { AdvisorService } from '../../../services/advisor-data.service';

@Component({
  selector: 'app-trader-dashboard',
  templateUrl: './trader-dashboard.component.html',
  styleUrls: ['./trader-dashboard.component.css']
})
export class TraderDashboardComponent implements OnInit {
  advisors= [];
  name:string;
  advisor;
  dataLoaded : boolean = false;
  wallet;
  constructor( private userAction: UserMenuAction,
     private router: Router, private ngRedux: NgRedux<IAppState> ) {
  }

  ngOnInit() {
    
    this.ngRedux.subscribe(()=>{
      var state= this.ngRedux.getState();

      if(state.usermenu.userMenuData){
        //this.wallet = state.usermenu.walletDetails;
        console.log(this.wallet)
      }
    })
  }
  addWallet(){
    this.router.navigateByUrl(UrlConfig.WALLET);
  }
}
