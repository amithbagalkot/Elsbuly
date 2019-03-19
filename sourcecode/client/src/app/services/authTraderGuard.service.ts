import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, 
    Router, NavigationEnd, RoutesRecognized, NavigationStart, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import { Observable } from 'rxjs';
import { UrlConfig } from '../config';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../stores/';


@Injectable()
export class AuthTraderGuardService implements CanActivate{
    previousUrl: string;
    currentUrl: string;
    constructor( private router : Router, private activatedRoute: ActivatedRoute, private ngRedux : NgRedux<IAppState>) { 
    }
    canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
        var reduxState = JSON.parse(localStorage.getItem('state'));
        if( localStorage.token) {
        
                return true
        }
            else {
                this.router.navigateByUrl(UrlConfig.LOGIN)
            }
        }
    }