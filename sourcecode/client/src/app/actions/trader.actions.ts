import { TRADER_GET_SUBSCRIPTIONS_SUCCESS, TRADER_GET_SUBSCRIPTIONS_ERROR, TRADER_SUBSCIRBE_ERROR, TRADER_SUBSCRIBE_SUCCESS, TRADER_SUBSCRIBE_ADVIOSR_IDEAS_SUCCESS, TRADER_SUBSCRIBE_ADVIOSR_IDEAS_ERROR, CANCEL_SUBSCRIPTION_SUCCESS, CANCEL_SUBSCRIPTION_ERROR } from '../constants/trader.constant';
import { SEND_EMAIL_SUCCESS, Send_Email_ERROR } from '../constants/email.constants';
import { RequestSenderService } from "../services/request-sender.service";
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store'
import { IAppState } from '../stores';
import { ApiConfig } from '../config/'
import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class TraderActions {
    constructor(private requestService: RequestSenderService, private ngRedux: NgRedux<IAppState>,
        private ngxSpinner: NgxSpinnerService, private loading: LoadingService) { }
    subscribe(data) {
        this.requestService.send({
            method: "POST",
            path: ApiConfig.TRADERSUBSCRIPTIONS,
            body: data
        }).subscribe((res) => {

            this.subscriptionSuccess(res)
        }, (error) => {
            this.subscriptionError(error)
        })
    }
    subscriptionSuccess(res) {
        this.ngRedux.dispatch({
            type: TRADER_SUBSCRIBE_SUCCESS,
            payload: res
        })
    };
    subscriptionError(error) {
        this.ngRedux.dispatch({
            type: TRADER_SUBSCIRBE_ERROR,
            payload: error
        })
    };


    getSubscriptions() {
        this.requestService.send({
            method: "GET",
            path: ApiConfig.TRADERSUBSCRIPTIONS,

        }).subscribe((res) => {
            this.getsubscriptionSuccess(res)
        }, (error) => {
            this.getsubscriptionError(error)
        })
    }
    getsubscriptionSuccess(res) {
        this.ngRedux.dispatch({
            type: TRADER_GET_SUBSCRIPTIONS_SUCCESS,
            payload: res
        })
    }
    getsubscriptionError(error) {
        this.ngRedux.dispatch({
            type: TRADER_GET_SUBSCRIPTIONS_ERROR,
            payload: error
        })
    }

    cancelSubscriptions(advisor_id) {
        this.requestService.send({
            method: "DELETE",
            path: ApiConfig.CANCEL_SUBSCRIPTION + advisor_id,
        }).subscribe((res) => {
            this.cancelsubscriptionSuccess(res)
        }, (error) => {
            this.cancelsubscriptionError(error)
        })
    }

    cancelsubscriptionSuccess(res) {
        this.ngRedux.dispatch({
            type: CANCEL_SUBSCRIPTION_SUCCESS,
            payload: res
        })
    }
    cancelsubscriptionError(error) {
        this.ngRedux.dispatch({
            type: CANCEL_SUBSCRIPTION_ERROR,
            payload: error
        })
    }

    getIdeas(advisorId) {
        this.loading.isLoadingTrue(true);
        this.requestService.send({
            method: "GET",
            path: ApiConfig.TRADER_SUBSCRIBED_IDEAS + advisorId,


        }).subscribe((res) => {
            this.loading.isLoadingFalse(false);
            this.getAdviosrIdeasSuccess(res);
        }, (error) => {
            this.loading.isLoadingFalse(false);
            this.getAdviosrIdeasError(error)
        })
    }
    getAdviosrIdeasSuccess(res) {
        this.ngRedux.dispatch({
            type: TRADER_SUBSCRIBE_ADVIOSR_IDEAS_SUCCESS,
            payload: res
        })
    }
    getAdviosrIdeasError(err) {
        this.ngRedux.dispatch({
            type: TRADER_SUBSCRIBE_ADVIOSR_IDEAS_ERROR,
            payload: err
        })
    }
    getAllIdeas() {
        this.loading.isLoadingTrue(true);
        this.requestService.send({
            method: "GET",
            path: ApiConfig.TRADER_SUBSCRIBED_ALL_IDEAS,
        }).subscribe((res) => {

            this.loading.isLoadingFalse(false);
            this.getAdviosrIdeasSuccess(res);

        }, (error) => {
            this.loading.isLoadingFalse(false);
            this.getAdviosrIdeasError(error)
        })
    }

}
