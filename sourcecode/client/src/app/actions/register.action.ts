import { OTP_SUCCESS, OTP_ERROR, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from "../constants/register.constant";
import { ApiConfig } from '../config/index';
import { RequestSenderService } from '../services/request-sender.service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../stores/store';
import { Injectable } from '@angular/core';
import { IUser } from "../stores/auth";

@Injectable()
export class RegisterAction {

    constructor(private requestService: RequestSenderService, private ngRedux: NgRedux<IAppState>) { }
    sendOtp(mobilenumber) {
        this.requestService.send({
            method: 'POST',
            path: ApiConfig.MOBILE_OTP,
            body: {
                mobilenumber
            }
        }).subscribe((res) => {
            return res;
        }, (error) => {
            console.log(error);
        })
    }
    

    verfiyOTP(mobilenumber, otp) {
        this.requestService.send({
            method: 'POST',
            path: ApiConfig.VERIFY_OTP,
            body: {
                mobilenumber,
                otp 
            }
        }).subscribe((res) => {
            this.verifyOtpSuccess(res);
        }, (error) => {
            this.verifyOtpError(error);
        })
    }
    verifyOtpSuccess(res) {
        this.ngRedux.dispatch({
            type: OTP_SUCCESS,
            payload: res
        })
    }
    verifyOtpError(error) {
        this.ngRedux.dispatch({
            type: OTP_ERROR,
            payload: error
        })
    }
    

    registerUser(userObj) {
        this.requestService.send({
            method: "POST",
            path: ApiConfig.REGISTER_USER,
            body: {
                userObj
            }
        }).subscribe((res) => { 
            this.registerUserSuccess(res);
           }, (error) => { 
            this.registerUserError(error);
         })
         
    }
    registerUserSuccess(res) {
        this.ngRedux.dispatch({
            type: REGISTER_USER_SUCCESS,
            payload : res
        })
    }
    registerUserError(error) {
        this.ngRedux.dispatch({
            type: REGISTER_USER_SUCCESS,
            payload : error
        })
    }
}
