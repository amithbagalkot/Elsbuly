import { STAR_RATING_SUCCESS, STAR_RATING_ERROR,GET_STAR_RATING_SUCCESS,GET_STAR_RATING_ERROR } from "./../constants/rating.constant";
import { IAppState } from './../stores/index';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { RequestSenderService } from '../services/request-sender.service';
import { ApiConfig } from '../config';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class RatingAction {
authState;
    constructor(private requestsenderservice:RequestSenderService,private ngRedux: NgRedux<IAppState>, private ngxSpinner: NgxSpinnerService) {
        this.authState = JSON.parse(localStorage.getItem('state')); 
     }

    createRating(ideaId, ideaRating, ideaRatingNote) {
        this.ngxSpinner.show();
        const output = this.requestsenderservice.send({
            method: "POST",
            path:`${ApiConfig.GET_IDEA}${ideaId}/rating`,
            body:{
                ideaId,
                traderId:this.authState.auth.user_id,
                ideaRating,
                ideaRatingNote
            }
        }).subscribe((res) => {
            this.ngxSpinner.hide();
            this.ratingIdeaSuccess(res)
       
        }, (error) => {
            this.ngxSpinner.hide();
            this.ratingError(error);
        })
    }
    ratingIdeaSuccess(res) { 
        this.ngRedux.dispatch({
            type: STAR_RATING_SUCCESS,
            payload: res.meta
        })
    }
    ratingError(errObj) {
        this.ngRedux.dispatch({
            type: STAR_RATING_ERROR,
            payload: errObj.error
        })
    }

    getRatings(ideaId) {
         this.requestsenderservice.send({
            method: "GET",
            path:`${ApiConfig.GET_IDEA}${ideaId}/rating`,
            body:{
                ideaId
                //traderId:this.authState.auth.user_id,
            }
        }).subscribe((res) => {
            this.getRatingIdeaSuccess(res)
       
        }, (error) => {
            this.getRatingIdeaError(error)
        })
    }
    getRatingIdeaSuccess(res) { 
        this.ngRedux.dispatch({
            type: GET_STAR_RATING_SUCCESS,
            payload: res
        })
    }
    getRatingIdeaError(errObj) {
        this.ngRedux.dispatch({
            type: GET_STAR_RATING_ERROR,
            payload: errObj.error
        })
    }
}   