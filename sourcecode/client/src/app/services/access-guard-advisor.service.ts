import {CanActivate,ActivatedRouteSnapshot,Router}  from '@angular/router';
import { ApiConfig, UrlConfig } from '../config';
import {Injectable} from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class AccessGuardAdvisor implements CanActivate{
    jwtHelper: JwtHelper = new JwtHelper();
    constructor(private router:Router){}
    canActivate(route: ActivatedRouteSnapshot): boolean {

        if (localStorage.token) {
            if(!this.jwtHelper.isTokenExpired(localStorage.token)&&this.jwtHelper.decodeToken(localStorage.token).userTypeId==30101){
                return true
          }else{
              this.router.navigateByUrl(UrlConfig.LOGIN);
          }
        }
        else{
            this.router.navigateByUrl(UrlConfig.LOGIN);
        }
    }
}
