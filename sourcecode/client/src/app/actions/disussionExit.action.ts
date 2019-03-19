import { DISCUSSION_EXIT_SUCCESS, DISCUSSION_EXIT_ERROR } from '../constants/discussion-exit.constant';
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { ApiConfig } from '../config'
import { IAppState } from '../stores/store';
import { RequestSenderService } from '../services/request-sender.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class DiscussionExitAction {
    constructor (private ngRedux:NgRedux<IAppState>, private requestService:RequestSenderService, private ngxSpinner: NgxSpinnerService){}
    
    userExit(){
        this.ngxSpinner.show();
        this.requestService.send({
            method:'GET',
            path:ApiConfig.DISCUSSION_EXIT
        }).subscribe((res)=>{
            this.discussionExitSuccess();
        }), (error)=>{
            this.discussionExitError();
        }
    }
    discussionExitSuccess(){
        this.ngxSpinner.hide();
        this.ngRedux.dispatch({
            type:DISCUSSION_EXIT_SUCCESS
        })
    }

    discussionExitError(){
        this.ngxSpinner.hide();
        this.ngRedux.dispatch({
            type:DISCUSSION_EXIT_ERROR
        })
    }
    
}