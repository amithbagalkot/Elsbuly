import { DISCUSSION_JOIN_SUCCESS, DISCUSSION_JOIN_ERROR, GET_IDEAS_SUCCESS, GET_IDEAS_ERROR, GET_IDEA_ID_SUCCESS, GET_IDEA_ID_ERROR } from '../constants/discussion-join.constant';
import { GET_DISCUSSION_USER_SUCCESS, GET_DISCUSSION_USER_ERROR, GET_IDEA_BOARD_TRADER } from '../constants/discussion_user.constants';
import { IAppState } from '../stores/index';
import { NgRedux } from '@angular-redux/store';
import { RequestSenderService } from "../services/request-sender.service";
import { Injectable } from '@angular/core';
import { ApiConfig } from '../config';
import { LoadingService } from '../services/loading.service';
import { TRADER_SUBSCRIBE_SUCCESS } from '../constants/trader.constant';

@Injectable()
export class DiscusionJoinAction {
    constructor(private ngRedux: NgRedux<IAppState>, private requestService: RequestSenderService, 
        private loading: LoadingService) { }


    getIdea(idea_id) {
        this.requestService.send({
            method: "GET",
            path: ApiConfig.GET_IDEA + idea_id
        }).subscribe((res) => {
            this.GetIdeaIdSuccess(res);
        }, (error) => {
            this.GetIdeaIdError(error);
        })
    }
    GetIdeaIdSuccess(res) {
        this.ngRedux.dispatch({
            type: GET_IDEA_ID_SUCCESS,
            payload: res
        })
    }
    GetIdeaIdError(errObj) {
        this.ngRedux.dispatch({
            type: GET_IDEA_ID_ERROR,
            payload: errObj.error.data
        });
    }
    getIdeas() {
        this.loading.isLoadingTrue(true);
        const output = this.requestService.send({
            method: "GET",
            path: ApiConfig.IDEAS_GET,

        }).subscribe((res) => {
            setTimeout(() => {
                this.loading.isLoadingFalse(false);
            this.getIdeasSuccess(res)
            }, 2000);
        }, (error) => {
            this.loading.isLoadingFalse(false);
            this.getIdeasError(error)
        })
    }
    getIdeasSuccess(res) {
        this.ngRedux.dispatch({
            type: GET_IDEAS_SUCCESS,
            payload: res
        })
    }
    getIdeasError(errObj) {
        this.ngRedux.dispatch({
            type: GET_IDEAS_ERROR,
            payload: errObj.error
        })
    }
    traderDiscussionJoin(ideaBoardTrader) {
        this.loading.isLoadingTrue(true);
        this.requestService.send({
            method: "POST",
            path: ApiConfig.IDEABOARDTRADER,
            body:ideaBoardTrader
        }).subscribe((res) => {
            this.loading.isLoadingFalse(false);
            this.discussionJoinSuccess(res);
        }, (error) => {
            this.loading.isLoadingFalse(false);
            this.discussionJoinError(error);
        })
    }
    discussionJoinSuccess(res) {
        this.ngRedux.dispatch({
            type: DISCUSSION_JOIN_SUCCESS,
            payload: res
        })
    }
    discussionJoinError(error) {
        this.ngRedux.dispatch({
            type: DISCUSSION_JOIN_ERROR,
            payload: error
        })
    }
    getDiscussionUser(discussion_board_id, idea_id) {
       const data = {
           idea_id : idea_id,
           duscussion_board_id : discussion_board_id
       }
        this.requestService.send({
            method: "GET",
            path: ApiConfig.GETDISCUSSIONUSER+discussion_board_id + '/'+idea_id
        }).subscribe((res) => {
            this.getDiscussionUserSuccess(res);
        }, (error) => {
            this.getDiscussionUserError(error);
        })
    }
    getDiscussionUserSuccess(res) {
          this.ngRedux.dispatch({
              type:GET_DISCUSSION_USER_SUCCESS,
              payload:res
          })
    }
    getDiscussionUserError(err) {
        this.ngRedux.dispatch({
            type:GET_DISCUSSION_USER_ERROR,
            payload:err
        })
    }

    addIdeaBoard(ideaBoard) {
         this.requestService.send({
             method: "POST",
             path: ApiConfig.ADDIDEABOARD,
             body: ideaBoard
         }).subscribe((res) => {
            this.getIdeaBoard(ideaBoard);
           
         }, (error) => {
             this.getDiscussionUserError(error);
         })
    }
    getIdeaBoard(ideaBoard) {
        this.requestService.send({
            method: "GET",
            path: ApiConfig.ADDIDEABOARD+ '/' +ideaBoard.ideaId,
        }).subscribe((res) =>{
            this.getDiscussionUserSuccess(res);
        })
    }

    ideaBoardTraderGet(ideaBoard) {
        this.requestService.send({
            method: "GET",
            path: ApiConfig.GET_IDEA_BOARD_TRADER+ '/' +ideaBoard.ideaId,
        }).subscribe((res) =>{
            this.ideaBoardTraderGetSuccess(res);
        })
        
    }
    ideaBoardTraderGetSuccess(res) {
        this.ngRedux.dispatch({
            type:GET_IDEA_BOARD_TRADER,
            payload:res
        })
    }
}
