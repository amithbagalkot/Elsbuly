import {
    CanLoad, CanActivate,
    ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivateChild
} from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../stores/';
import { UrlConfig } from '../config/';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { UserMenuAction } from '../actions/user-menu.action';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AdvisorGuard implements CanLoad {
    jwtHelper: JwtHelper = new JwtHelper();;
    errorrr;
    constructor(private ngRedux: NgRedux<IAppState>, private router: Router, private usermenuaction: UserMenuAction) {

    }
    hasError: boolean = false;

    canLoad(route: Route): boolean {
        return this.checkLoggedIn();

    }
    checkLoggedIn(): boolean {
        // this.ngRedux.subscribe(() => {
        //     const { hasError } = this.ngRedux.getState().usermenu;
        //     this.hasError = hasError;
        //     if (localStorage.token && this.hasError) {
        //         localStorage.clear();
        //         this.router.navigateByUrl(UrlConfig.LOGIN);
        //     }
        // });
        if (localStorage.token) {
            if (!this.jwtHelper.isTokenExpired(localStorage.token) && this.jwtHelper.decodeToken(localStorage.token).userTypeId === (30101 || 30103)) {
                return true;
            }
            else {
                return false;
            } 
        }
        else {
            localStorage.clear();
            this.router.navigateByUrl(UrlConfig.LOGIN);
            return false;
        };
    }

};
