import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PathConfig } from '../config';
import { select, select$, NgRedux } from '@angular-redux/store';
import { IAppState } from './../stores/';
import { ApiConfig, UrlConfig } from './../config';
import { LoginActions } from '../actions/authLogin.actions';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class ResolvePathService {
    email;
    password;
    user_type_id;
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private loginAction: LoginActions,private router: Router, private ngRedux: NgRedux<IAppState>) {   
    }

    resolve(code) {
        this.user_type_id=this.jwtHelper.decodeToken(localStorage.token).userTypeId;
        if(code=="CLOSE"){
            localStorage.clear();
            this.router.navigateByUrl(UrlConfig.LOGIN);
        }
        if(code == "PROFILE" ) {
            this.router.navigateByUrl(UrlConfig.PROFILE);
        }
        if (this.user_type_id == 30102 || this.user_type_id == 30103) {
            var res = code;
            if (res == "IDEAS") {
                var Ideaspath = PathConfig.IDEAS
                this.router.navigateByUrl(Ideaspath);
            }
            else if (res == "GENERATE") {
                var IdeaGeneratePath = PathConfig.GENERATE
                this.router.navigateByUrl(IdeaGeneratePath);

            }
            else if (res == "RATINGS") {
                var RatingPath = PathConfig.RATINGS;
                this.router.navigateByUrl(RatingPath);
            }
            else if(res == "PREFERENCES") {
                this.router.navigateByUrl(PathConfig.PREFRENCES);
            }
            else if (res == "DISCUSSIONS") {
                var DiscussionPath = PathConfig.DISCUSSIONS;
                this.router.navigateByUrl(DiscussionPath);
            }
        }
        if (this.user_type_id == 30101) {
            var res = code;
            if (res == "IDEAS") {
                //var Ideaspath = PathConfig.IDEAS
                this.router.navigateByUrl(UrlConfig.TRADER_ADVIOSR_ALL_IDEAS);
            }
            else if (res == "GENERATE") {
                var IdeaGeneratePath = PathConfig.GENERATE
                this.router.navigateByUrl(IdeaGeneratePath);

            }
            else if (res == "RATINGS") {
                var RatingPath = PathConfig.RATINGS;
        
                this.router.navigateByUrl(UrlConfig.TRADER);
            }
            else if (res == "DISCUSSIONS") {
                var DiscussionPath = PathConfig.DISCUSSIONS;
                this.router.navigateByUrl(DiscussionPath);
            }
            else if (res == "MONEY") {
                //var DiscussionPath = PathConfig.DISCUSSIONS;
                this.router.navigateByUrl(UrlConfig.WALLET);
            }
            else if(res == "PREFERENCES") {
                this.router.navigateByUrl(PathConfig.PREFRENCES);
            }
            else if(res=="SUBSCRIPTIONS"){
                this.router.navigateByUrl(UrlConfig.TRADER_SUBSCRIPTIONS);
            }
            else if(res=="ADVISORS"){
                this.router.navigateByUrl(UrlConfig.ADVISORS_LIST);
            }
        }
    }
    
};

