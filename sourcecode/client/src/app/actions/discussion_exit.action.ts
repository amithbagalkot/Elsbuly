import { DISCUSSION_EXIT_SUCCESS,DISCUSSION_EXIT_ERROR} from '../constants/discussion-exit.constant';
import { IAppState } from '../stores/index';
import { NgRedux } from '@angular-redux/store';
import { RequestSenderService } from "../services/request-sender.service";
import { Injectable } from '@angular/core';
import { ApiConfig } from '../config';
import { resetReducer } from '../stores/reset';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class DiscusionExitAction {
    constructor(private ngRedux: NgRedux<IAppState>, private requestService: RequestSenderService, private ngxSpinner: NgxSpinnerService) { }

    discussionExit(ideaBoardExit) { 
        var ideaId = ideaBoardExit.ideaId;
        var ideaBoardId = ideaBoardExit.ideaBoard
            this.requestService.send({
            method: "DELETE",
            path: ApiConfig.DISCUSSIONEXIT + '/' + ideaId + '/' + ideaBoardId
        }).subscribe((res) => {
            this.discussionExitSuccess(res);
        }, (error) => {
            this.discussionExitError(error);
        })
    }
    discussionExitSuccess(res) {
        this.ngRedux.dispatch({
            type: DISCUSSION_EXIT_SUCCESS,
            payload: res
        })
    }
    discussionExitError(errObj) {
        this.ngRedux.dispatch({
            type: DISCUSSION_EXIT_ERROR,
            payload: errObj.error.data
        });
    }
}