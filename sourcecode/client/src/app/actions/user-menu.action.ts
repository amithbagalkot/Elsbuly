import { RequestSenderService } from '../services/request-sender.service';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../stores';
import { ApiConfig } from '../config';
import { USERMENU_DATA_SUCCESS, USERMENU_DATA_ERROR } from '../constants/user-menu.constants';
@Injectable()
export class UserMenuAction {
    constructor(private requestService: RequestSenderService, private ngRedux: NgRedux<IAppState>) {}
    userMenu() {
        this.requestService.send({
            method: "GET",
            path: ApiConfig.USER_MENU,
        }).subscribe((res) => {
            this.userDataSuccess(res);
        },(err)=>{
           this.userDataError(err)
        })
    };

    userDataSuccess(res) {
        this.ngRedux.dispatch({
            type: USERMENU_DATA_SUCCESS,
            payload: res
        })
        }
    
        userDataError(errObj){
        this.ngRedux.dispatch({
            type: USERMENU_DATA_ERROR,
            payload: errObj
        })
    }
}