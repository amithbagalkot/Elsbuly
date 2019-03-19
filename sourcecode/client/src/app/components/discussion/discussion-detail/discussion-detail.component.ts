import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, Renderer, QueryList} from '@angular/core';
//import { DiscussionExitAction } from '../../../actions/disussionExit.action';
import { Router, ActivatedRoute } from '@angular/router';
import { UrlConfig } from '../../../config';
import { DiscusionJoinAction } from '../../../actions/discussion-Join.action';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores';
import { IIdea } from '../../../stores/idea';
import { ChatService } from '../../../services/chat.service';
import { DiscusionExitAction } from '../../../actions/discussion_exit.action';
@Component({
  selector: 'app-discussion-detail',
  templateUrl: './discussion-detail.component.html',
  styleUrls: ['./discussion-detail.component.css']
})
export class DiscussionDetailComponent implements OnInit, AfterViewChecked {
  id: any;
  idea: IIdea;
  messagesData= [];
  message;
  loading:boolean=true;
  chatInput:boolean=false;
  discussion_user;
  discussion_board_type;
  userDetail;
  ideaBoardTradExit;
  discussion_board_id;
  ideaBoardId;
  user_right_message: boolean = false;
  @ViewChild('scroller') private myScrollContainer: ElementRef;
  
  
  constructor(private renderer:Renderer,private chatservice: ChatService, 
    private discussionExitAction: DiscusionExitAction, private router: Router, private activatedRoute: ActivatedRoute,
    private discussionJoinAction: DiscusionJoinAction, private ngRedux: NgRedux<IAppState>) {
      this.discussion_board_type=localStorage.getItem('typeofboard');
      this.userDetail = JSON.parse(localStorage.getItem('state')).auth;
      
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
      var discussion_board={
        discussion_board_type:this.discussion_board_type,
        discussion_board_id:this.discussion_board_id
      };
  
    //this.discussionJoinAction.getDiscussionUser(this.discussion_board_id);
    this.id = this.activatedRoute.snapshot.params['id'];
    this.ideaBoardId = this.activatedRoute.snapshot.params['ideaBoardId'];
     
    var ideaBoardTrader = {
      ideaId : this.id,
      ideaBoard: this.ideaBoardId
    }
    this.ideaBoardTradExit = ideaBoardTrader;

    
    this.discussionJoinAction.traderDiscussionJoin(ideaBoardTrader);

    // this.discussionJoinAction.ideaBoardTraderGet();
    // this.router.navigateByUrl('discussion/detail/'+this.id);
    this.discussionJoinAction.getIdea(this.id);
    this.ngRedux.subscribe(() => {
      var state = this.ngRedux.getState();
      if (state.discussionJoin.discussionJoin) {
        this.idea = state.discussionJoin.result;
      }
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
    this.scrollToBottom();
    this.chatservice.getMessages(this.id).valueChanges().subscribe(data => {
      this.messagesData = data;
      this.messagesData.forEach(user=>{
        if(this.userDetail.userinfo.email_id === user.email) {
          this.user_right_message = true;
        }
      })
       if(this.messagesData){
        this.loading=false;
        this.chatInput=true;
       }
       
    }, err => {
      console.log(err);
    });
    // this.renderer.invokeElementMethod(this.inputFoucs.nativeElement, 'focus', []);
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  send() {
    if(this.message !== "") {
      this.chatservice.sendMessage(this.message, this.id);
    }
    this.message = "";
    
  }
  handleSubmit(event) {
    if (event.keyCode === 13) {
       this.send(); 
    }
  }

  exit() {
    this.discussionExitAction.discussionExit(this.ideaBoardTradExit);
  }
  scrollToBottom(): void {

    //  window.scrollTo(0, this.myScrollContainer.nativeElement.scrollHeight);
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err)
     }
  }
}