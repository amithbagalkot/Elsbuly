import { Component, OnInit } from '@angular/core';
import { IdeaActions } from '../../../actions/idea.action';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DiscusionJoinAction } from '../../../actions/discussion-Join.action'
import { CommonActions } from '../../../actions/common.actions';
//import { getLocaleCurrencyName } from '@angular/common';

@Component({
  selector: 'app-advisor-idea',
  templateUrl: './advisor-idea.component.html',
  styleUrls: ['./advisor-idea.component.css']
})
export class AdvisorIdeaComponent implements OnInit {
  Ideas: any;
  state;
  traderIdeas: boolean = false;
  localState;
  user_id: any;
  IdeasLength: boolean = true;

  constructor(private discussionJoinAction: DiscusionJoinAction, private toastr: ToastsManager, private ngRedux: NgRedux<IAppState>, private commonAction: CommonActions, private ideaAction: IdeaActions) {

  }
  exchange_code;
  exchange_codes = [];
  advisorName;
  advisorNames = [];
  newExchange_codes = [];
  newAdvisorNames = [];
  exchanges;
  ngOnInit() {

    this.commonAction.getExchange();
    this.discussionJoinAction.getIdeas()
    this.ngRedux.subscribe(() => {
      this.state = this.ngRedux.getState();
      this.exchanges = this.state.common.exchange;
      if (this.state.discussionJoin.getIdeas) {
        this.Ideas = this.state.discussionJoin.result;
        if (this.Ideas.length === 0) {
          this.IdeasLength = false;
        }
        for (let i = 0; i < this.Ideas.length; i++) {
          this.exchange_code = this.Ideas[i].actual_exchange_code;
          this.exchange_codes.push(this.exchange_code);
          this.advisorName = this.Ideas[i].user_name;
          this.advisorNames.push(this.advisorName)
        }
      }
      this.newExchange_codes = Array.from(new Set(this.exchange_codes));
      this.newAdvisorNames = Array.from(new Set(this.advisorNames));
    })
  }
}