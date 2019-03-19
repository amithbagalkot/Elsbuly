import { RequestSenderService } from '../services/request-sender.service';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState } from '../stores';
import { ApiConfig } from '../config';
import { User } from '../user';
import { PASSWORD_RESET_ERROR, PASSWORD_RESET_CONFIRM } from '../constants/reset.constants';

@Injectable()
export class ResetAction {
    constructor(private requestService: RequestSenderService, private ngRedux: NgRedux<IAppState>) { }

    resetPassword(password) {
        const output = this.requestService.send({
            method: "PUT",
            path: ApiConfig.RESET,
            body: {
                password
            }
        }).subscribe((res) => {
            this.passwordConfirm(res);
        }, (error) => {
            this.passwordError(error);
        })
    }
    passwordConfirm(password) {
        this.ngRedux.dispatch({
            type: PASSWORD_RESET_CONFIRM,
            payload: password
        })
    }
    passwordError(errObj) {
        this.ngRedux.dispatch({
            type: PASSWORD_RESET_ERROR,
            payload: errObj.error
        })
    }
}
