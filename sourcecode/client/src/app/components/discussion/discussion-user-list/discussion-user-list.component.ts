import { Component, OnInit } from '@angular/core';
import { DiscusionJoinAction } from '../../../actions/discussion-Join.action';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores';
@Component({
  selector: 'app-discussion-user-list',
  templateUrl: './discussion-user-list.component.html',
  styleUrls: ['./discussion-user-list.component.css']
})
export class DiscussionUserListComponent implements OnInit {

  discussion_board_type;
  discussion_board_id;
  discussion_user;
  constructor(private discussionJoinAction: DiscusionJoinAction,private ngRedux: NgRedux<IAppState>) {

    this.discussion_board_type=localStorage.getItem('typeofboard');
      
    if(this.discussion_board_type=='consectetur'){
          this.discussion_board_id=100;
    }
    if(this.discussion_board_type=='condimentum'){
      this.discussion_board_id=101;
     }
     if(this.discussion_board_type=='bibendum'){
      this.discussion_board_id=102;
     }
     if(this.discussion_board_type=='eget'){
      this.discussion_board_id=103;
     }
     if(this.discussion_board_type=='tempus'){
      this.discussion_board_id=104;
     }
     if(this.discussion_board_type=='cell1_1'){
      this.discussion_board_id=105;
     }
   }

  ngOnInit() {
   // this.discussionJoinAction.getDiscussionUser(this.discussion_board_id);
    this.ngRedux.subscribe(() => {
      var state = this.ngRedux.getState();
      // if (state.discussionJoin.discussionJoin) {
      //   // this.idea = state.discussionJoin.result;
      //   // console.log(this.idea)
      // }
      if(this.discussion_board_id==100){
        this.discussion_user=state.get_discussion_user.result1;
         //location.reload(false);
      }
      if(this.discussion_board_id==101){
        this.discussion_user=state.get_discussion_user.result2;
      }
      if(this.discussion_board_id==102){
        this.discussion_user=state.get_discussion_user.result3;
      }
      if(this.discussion_board_id==103){
        this.discussion_user=state.get_discussion_user.result4;
      }
      if(this.discussion_board_id==104){
        this.discussion_user=state.get_discussion_user.result5;
        // location.reload(true);
      }

      if(this.discussion_board_id==105){
        this.discussion_user=state.get_discussion_user.result6;
        // location.reload(true);
      }
     
    });
  }

}
