import { Component, OnInit, ViewContainerRef, AfterContentInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiConfig, UrlConfig } from '../../../config';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores/';
import { LoginActions } from '../../../actions/authLogin.actions';
import { ResolvePathService } from '../../../services/resolve-path-service.service';
import { RequestSenderService } from '../../../services/request-sender.service'
import { ConnectionService } from '../../../services/connection.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit, AfterContentInit {
    connected: boolean = true;
    state;
    user_type_id;
    user = {
        email: '',
        password: ''
    };

    constructor(private router: Router, private resolvepathservice: ResolvePathService,
        private requestSender: RequestSenderService,
        private toastr: ToastsManager,
        private loginAction: LoginActions,  private ngxSpinner: NgxSpinnerService,
        private ngRedux: NgRedux<IAppState>, private connection: ConnectionService) {
            this.connected = connection.connected;
            this.connection.Changes.subscribe((state)=>{this.connected = state});
    }

    ngOnInit() {
        this.ngxSpinner.show();
        // if(localStorage.token)
        // {
        //     this.router.navigateByUrl(UrlConfig.Ideas);
        // }
        // setTimeout(()=>{this.ngxSpinner.hide()}, 2000)
      
        this.ngRedux.subscribe(() => {
            var state = this.ngRedux.getState()
           // const user_type = state.auth.user_type_id.split(',');
            // user_type.forEach(element => {
            //     this.user_type_id = element;
            // });
            // const trader_user_type = user_type[0];
            // const advisor_user_type = user_type[1];
            const new_result = state.auth;
            if (state.auth.loggedIn && state.auth.user_type_id == 30103) {
                console.log("Admin");
                state.auth.loggedIn = false;
                this.router.navigateByUrl(UrlConfig.Ideas);
            }
            // if (state.auth.loggedIn && trader_user_type == 30101) {
            //     console.log("Trader");
            //     state.auth.loggedIn = false;
            //     this.router.navigateByUrl(UrlConfig.TRADER);
            //}
            // if (state.auth.loggedIn && advisor_user_type == 30101) {
            //     console.log("advisor");
            //     state.auth.loggedIn = false;
            //     this.router.navigateByUrl(UrlConfig.TRADER);
            // }
            if (state.auth.loggedIn && state.auth.user_type_id == 30101) {
                console.log("Trader");
                state.auth.loggedIn = false;
                this.router.navigateByUrl(UrlConfig.TRADER);
            }
            if (state.auth.loggedIn && state.auth.user_type_id == 30102) {
                console.log("Advisor");
                state.auth.loggedIn = false;
                this.router.navigateByUrl(UrlConfig.DASHBOARD);
            }
            if (state.auth.hasError) {
                console.log(state.auth);
                this.toastr.error(state.auth.error);
            }

        });
    }

    ngAfterContentInit() {
        this.ngxSpinner.hide()
    }

    login() {
        var email = this.user.email;
        var password = this.user.password;
        this.loginAction.loginUser(email, Md5.hashStr(password));
    }
};
