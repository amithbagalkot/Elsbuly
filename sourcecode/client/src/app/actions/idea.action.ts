import {IDEA_CREATED, IDEA_UPDATED, IDEA_DELETED, IDEA_ERROR, GET_IDEA} from '../constants/idea.constant';
import { RequestSenderService } from '../services/request-sender.service';
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core'; 
import { IAppState } from '../stores/index';
import { ApiConfig } from '../config';
import { IIdea } from "../stores/idea/idea.types";
import {DiscussionService} from '../services/discussion.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable()
export class IdeaActions {
    constructor(private ngRedux: NgRedux<IAppState>, private requestSender: RequestSenderService, private ngxSpinner: NgxSpinnerService) { }


    createIdea(data:any) {
        this.ngxSpinner.show();
        this.requestSender.send({
            method: "POST",
            path: ApiConfig.CREATE_IDEA,
            body: {
                data
            }
        }).subscribe((res)=>{
            this.ngxSpinner.hide();
            this.CreateIdeaSuccess(res);
        },
        (err)=> {
            this.ngxSpinner.hide();
            this.crateIdeaError(err);
        }
    )};
    CreateIdeaSuccess(res) {
        this.ngxSpinner.show();
        this.ngRedux.dispatch({
            type: IDEA_CREATED,
            payload: res
            
        })
        }
    
    crateIdeaError(errObj){
        this.ngRedux.dispatch({
            type: IDEA_ERROR,
            payload: errObj.err
        })
    }
    ideaUpdate() {
        this.requestSender.send({
            method: "PUT",
            path: "",
            body: {}
        }).subscribe((res)=>{

        }
    )};

    ideaDelete(){
        this.requestSender.send({
            method: "DELETE",
            path: "",
            body: {}
        }).subscribe((res)=>{

        }
        )};
        
    }

   
