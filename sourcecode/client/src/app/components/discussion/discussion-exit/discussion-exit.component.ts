import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DiscusionJoinAction } from "../../../actions/discussion-Join.action";
import {DiscusionExitAction} from '../../../actions/discussion_exit.action';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../.././../stores';
import { ToastsManager } from 'ng2-toastr';
import { IIdea } from '../../../stores/idea';
@Component({
  selector: 'app-discussion-exit',
  templateUrl: './discussion-exit.component.html',
  styleUrls: ['./discussion-exit.component.css']
})
export class DiscussionExitComponent implements OnInit {
id:any;
idea:IIdea;
ideaBoardTrader;
  constructor(private discussionExitAction:DiscusionExitAction ,private activatedRoute:ActivatedRoute,
  private discussionJoinAction:DiscusionJoinAction, private ngRedux:NgRedux<IAppState>) {
    const route = this.activatedRoute.snapshot;
   }

  ngOnInit() {
    this.id=this.activatedRoute.snapshot.params['id'];
    var ideaBoard = {
      ideaId : this.id
    } 
    this.discussionJoinAction.ideaBoardTraderGet(ideaBoard);
    this.discussionJoinAction.getIdea(this.id);
    this.ngRedux.subscribe(() => {
      var state = this.ngRedux.getState();
      if (state.discussionJoin.discussionJoin){
        this.idea=state.discussionJoin.result;
      }
      if(state.get_discussion_user.getIdeaBoardTrader) {
        this.ideaBoardTrader = state.get_discussion_user.getIdeaBoardTraderUser;
      }
    });
  }

  discussionExit(){
    // this.discussionExitAction.discussionExit(ideaBoard);
  }

}
