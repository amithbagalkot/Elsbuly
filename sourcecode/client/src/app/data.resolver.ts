import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './stores/store';
import { Observable } from 'rxjs';

@Injectable()
export class DataResolver implements Resolve<any> {
    state;
    constructor(private ngRedux: NgRedux<IAppState>){
        debugger
    }
     resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
         console.log(state);
        const { auth } = this.ngRedux.getState();
        debugger
        console.log(auth);
        console.log(state.root);
        console.log(route.data.data)
        debugger
        //this.state = JSON.parse(localStorage.getItem('state'));
        return auth;
    }
} 