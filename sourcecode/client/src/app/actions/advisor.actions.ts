import { ADVISOR_GET_SUBSCRIPTIONS_SUCCESS, ADVISOR_GET_SUBSCRIPTIONS_ERROR ,ADVISOR_GET_SUCCESS,ADVISOR_GET_ERROR} from '../constants/advisor.constants';
//import { SEND_EMAIL_SUCCESS, Send_Email_ERROR } from '../constants/email.constants';
import { RequestSenderService } from "../services/request-sender.service";
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store'
import { IAppState } from '../stores';
import { ApiConfig } from '../config/'

@Injectable()
export class AdvisorActions {
    constructor(private requestService: RequestSenderService, private ngRedux: NgRedux<IAppState>) { }

    getAdvisors() {
        this.requestService.send({
            method: "GET",
            path: ApiConfig.ADVISORS,
        }).subscribe((res) => {
            this.getAdvisorsSuccess(res)
        }, (error) => {
            this.getAdvisorsError(error)
        })
    }
    getAdvisorsSuccess(res) {
        this.ngRedux.dispatch({
            type: ADVISOR_GET_SUCCESS,
            payload: res
        })
    }
    getAdvisorsError(error) {
        this.ngRedux.dispatch({
            type: ADVISOR_GET_ERROR,
            payload: error
        })
    }

    getSubscriptions() {
        this.requestService.send({
            method: "GET",
            path: ApiConfig.ADVISORSUBSCRIPTIONS,
        }).subscribe((res) => {
            this.getsubscriptionSuccess(res)
        }, (error) => {
            this.getsubscriptionError(error)
        })
    }
    getsubscriptionSuccess(res) {
        this.ngRedux.dispatch({
            type: ADVISOR_GET_SUBSCRIPTIONS_SUCCESS,
            payload: res
        })
    }
    getsubscriptionError(error) {
        this.ngRedux.dispatch({
            type: ADVISOR_GET_SUBSCRIPTIONS_ERROR,
            payload: error
        })
    }
}