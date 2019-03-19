import {
    LOGOUT_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS,
    REGISTER_EMAIL, REGISTER_PASSWORD, REGISTER_PHONE, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR
} from '../constants/login.constants';
import { IAppState } from '../stores/index';
import { NgRedux } from '@angular-redux/store';
import { RequestSenderService } from "../services/request-sender.service";
import { Injectable } from '@angular/core';
import { ApiConfig } from '../config';
import { USERMENU_DATA_SUCCESS, USERMENU_DATA_ERROR } from '../constants/user-menu.constants';
import { state } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoginActions {
    constructor(private ngRedux: NgRedux<IAppState>, private requestService: RequestSenderService,  private ngxSpinner:NgxSpinnerService) { }

    loginUser(email, password) {
        this.ngxSpinner.show();
        this.requestService.send({
            method: "POST",
            path: ApiConfig.LOGIN,
            body: {
                email,
                password
            }
        }).subscribe((res) => {
            this.ngxSpinner.hide();
            this.loginSuccess(res); 
        }, (error) => {
            this.ngxSpinner.hide();
            this.loginError(error);
        })
    }
    loginSuccess(user) {
        
        this.ngRedux.dispatch({ 
            type: LOGIN_USER_SUCCESS,
            payload: user
        })
        localStorage.token = user.data.token;
        localStorage.setItem('state', JSON.stringify(this.ngRedux.getState()));

    }
    loginError(errObj) {
        this.ngRedux.dispatch({
            type: LOGIN_USER_ERROR,
            payload: errObj.error.data
        })
    }

    logOutUser() {
        this.ngRedux.dispatch({
            type: LOGOUT_USER,
        })
        localStorage.clear
    }

  

  
}
