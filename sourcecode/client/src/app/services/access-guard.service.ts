import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ApiConfig, UrlConfig } from '../config';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class AccessGuard implements CanActivate {
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        // console.log(this.jwtHelper,
        // this.jwtHelper.decodeToken(localStorage.token),
        // this.jwtHelper.getTokenExpirationDate(localStorage.token),
        // this.jwtHelper.isTokenExpired(localStorage.token));
        //console.log("hi i am kranthi"+this.jwtHelper.isTokenExpired(localStorage.token))
        if (localStorage.token) {
            if (!this.jwtHelper.isTokenExpired(localStorage.token)) {
                return true

            } else {
                this.router.navigateByUrl(UrlConfig.LOGIN);
            }
        }
        else {
            this.router.navigateByUrl(UrlConfig.LOGIN);
        }



    }
}



