import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlConfig } from '../../../config/';
import { DiscusionJoinAction } from '../../../actions/discussion-Join.action'
import { IAppState } from '../../../stores';
import { NgRedux } from '@angular-redux/store';
import { IIdea } from '../../../stores/idea';
import { ChatService } from '../../../services/chat.service';
import { DiscusionExitAction } from '../../../actions/discussion_exit.action';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion-join.component.html',
  styleUrls: ['./discussion-join.component.css']
})

export class DiscussionJoinComponent implements OnInit {
  ideaBoard;
  id: any;
  idea: IIdea;
  ideaIdRouter;
  state;
  userDetails;
  ideaBoardTrader;
  ideaBoardTraderLength;

  board_selection: boolean = true;
  discussion_board_type;
  discussion_board_id;
  constructor(private ref: ChangeDetectorRef, private discussionExitAction: DiscusionExitAction, 
    private chatservice: ChatService,
    private router: Router, private activatedRoute: ActivatedRoute,
    private discussionJoinAction: DiscusionJoinAction, private ngRedux: NgRedux<IAppState>) {
      this.userDetails = JSON.parse(localStorage.getItem('state')).auth.userinfo;    
  }

  ngOnInit() {
    // this.discussionExitAction.discussionExit();
    this.id = this.activatedRoute.snapshot.params['id'];

    var ideaBoard = {
      ideaId : this.id
    }
    this.discussionJoinAction.getIdeaBoard(ideaBoard);
    this.discussionJoinAction.ideaBoardTraderGet(ideaBoard);

    //this.router.navigateByUrl('discussion/join/' + this.id);

    this.state = JSON.parse(localStorage.getItem('state'));

    this.discussionJoinAction.getIdea(this.id)
    this.ngRedux.subscribe(() => {
      var state = this.ngRedux.getState();
      if (state.discussionJoin.discussionJoin) {
        this.idea = state.discussionJoin.result;
      }

      if(state.get_discussion_user.getideaBoardsuccess) {
        this.ideaBoard = state.get_discussion_user.getIdeaBoard;
      }

      if(state.get_discussion_user.getIdeaBoardTrader) {
      this.ideaBoardTrader = state.get_discussion_user.getIdeaBoardTraderUser;
      this.ideaBoardTraderLength = this.ideaBoardTrader.length;
      this.ideaBoardTrader.forEach(e => {
        if(e.record_status_id === 10102) {
          this.ideaBoardTraderLength = this.ideaBoardTraderLength - 1;
        }
      });
     
      }
    })

  }
  typeOfBoard(event) {
    this.ideaIdRouter = event.idea_board_id;
    localStorage.setItem('typeofboard', event.idea_board_name);
    this.board_selection = false;
  }
}