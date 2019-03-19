import {
    GET_EXCHANGE_SUCCESS, GET_COUNTRY_SUCCESS,
    GET_INSTRUMENT_SUCCESS, GET_REGION_SUCCESS, GET_SCRIPT_SUCCESS, GET_SEGMENT_SUCCESS, EXCHANGE_ERROR
} from '../constants/common.constant';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store'
import { IAppState } from '../stores';
//import { commonService } from '../services/common.service';
import { RequestSenderService } from '../services/request-sender.service';
import { ApiConfig } from '../config/'

@Injectable()

export class CommonActions {
    constructor(private ngRedux: NgRedux<IAppState>, private requestSender : RequestSenderService) { }
    output: any;
    getRegion() {
        this.requestSender.send({
            method: "GET",
            path: ApiConfig.REGION
        }).subscribe((res) => {
            this.getRegionSuccess()
        })
    }
    getRegionSuccess() {
        this.ngRedux.dispatch({
            type: GET_REGION_SUCCESS
        })
    };

    getCountry() {
        this.requestSender.send({
            method: "GET",
            path: ApiConfig.COUNTRY
        }).subscribe((res) => {
            this.getCountrySuccess(res)
        })
    }
    getCountrySuccess(res) {
        this.ngRedux.dispatch({
            type: GET_COUNTRY_SUCCESS,
            payload: res
        })
    };

    getExchange() {
        this.requestSender.send({
            method: "GET",
            path: ApiConfig.EXCHANGE
        }).subscribe((res) => {
            this.getExchangeSuccess(res)
        },
         (error) => {
            this.exchangeError(error);
        })
    }

    getExchangeSuccess(res) {
        this.ngRedux.dispatch({
            type: GET_EXCHANGE_SUCCESS,
            payload:res
        })
    };
    
    exchangeError(errObj) {
        this.ngRedux.dispatch({
            type: EXCHANGE_ERROR,
            payload: errObj.error.data
        })
    };

    getInstrument() {
        this.requestSender.send({
            method: "GET",
            path: ApiConfig.INSTRUMENT
        }).subscribe((res) => {
            this.getInstrumentSuccess(res)
        })
    }
    getInstrumentSuccess(res) {
        this.ngRedux.dispatch({
            type: GET_INSTRUMENT_SUCCESS,
            payload: res
        })
    };
    getSegment() {
        this.requestSender.send({
            method: "GET",
            path: ApiConfig.SEGMENT
        }).subscribe((res) => {
            this.getSegmentSuccess(res)
        })
    }
    getSegmentSuccess(res) {
        this.ngRedux.dispatch({
            type: GET_SEGMENT_SUCCESS,
            payload: res
        })
    };
    getScript() {
        this.requestSender.send({
            method: "GET",
            path: ApiConfig.SCRIPT
        }).subscribe((res) => {
            this.getScriptSuccess(res)
        })
    }
    getScriptSuccess(res) {
        this.ngRedux.dispatch({
            type: GET_SCRIPT_SUCCESS,
            payload:res
        })
    }

}
