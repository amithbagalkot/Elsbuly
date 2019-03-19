import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { RequestSenderService } from '../services/request-sender.service';
import { ApiConfig } from '../config';
import { IAppState } from '../stores';
import  * as Preference from '../constants/preferences.constant';
import 'rxjs/add/operator/map'

@Injectable()
export class PreferenceNotificationAction {
    
    constructor(private requestSender: RequestSenderService, private ngRedux: NgRedux<IAppState>) {
    }

    ideaPreference (data) {
       this.requestSender.send({
           method: "POST",
           path: `${ApiConfig.PREFERENCES}`,
           body: {data}
       }).subscribe(res=>{
           this.ideaPreferenceSucess(res)
       },err =>{
           this.ideaPreferenceError(err)
       })     
    }
    ideaPreferenceSucess(res) { 
        this.ngRedux.dispatch({
            type: Preference.IDEA_PREFERENCES_SUCCESS,
            payload: res
        })
    };
    ideaPreferenceError(err) {
        this.ngRedux.dispatch({
            type: Preference.PROFILE_PREFERENCES_ERROR,
            payload: err
        })
    }
    getNotifications() {
        this.requestSender.send({
            method: "GET",
            path: `${ApiConfig.PREFERENCES}`
         })
        //  .map(res=>{
        //     console.log(res.data);
        //     res
        // })
        
        .subscribe(res=>{
            const result = {
                res: res
            }
            this.getNotificationSuccess(result);
        },err =>{
            this.getNotificationError(err)
        })
    }

    getNotificationSuccess(res) {
        this.ngRedux.dispatch({
            type: Preference.GET_NOTIFICATION_SUCCESS,
            payload: res
        })
    }
    getNotificationError(err) {
        this.ngRedux.dispatch({
            type: Preference.GET_NOTIFICATION_ERROR,
            payload: err
        })
    }
}