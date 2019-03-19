import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IIdea } from '../../../stores/idea';
import { TraderActions } from '../../../actions/trader.actions';
import { select, select$, NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores/';
import { ActivatedRoute } from '@angular/router';
import { CheckIdeaService } from '../../../services/checkIdea.service';

@Component({
  selector: 'app-trader-idea',
  templateUrl: './trader-idea.component.html',
  styleUrls: ['./trader-idea.component.css']
})
export class TraderIdeaComponent implements OnInit {

  tradersubscribed_Adviosr_ideas;
  advisorId;
  no_ideas:boolean=false;
  constructor(private activatedroute: ActivatedRoute, private ngRedux: NgRedux<IAppState>, private traderactions: TraderActions,
    private checkIdeaService: CheckIdeaService) {
  }

  ngOnInit() {
    
    this.advisorId = this.activatedroute.snapshot.params['advisorId'];
    this.traderactions.getIdeas(this.advisorId);
    this.ngRedux.subscribe(() => {
      var traderSubsribe = this.ngRedux.getState().traderSubsribe;

      /* -------getting ideas of trader subscribed advisor------*/
      if (traderSubsribe.getAdviosrIdeas) {
        this.tradersubscribed_Adviosr_ideas = traderSubsribe.result;
       if(this.tradersubscribed_Adviosr_ideas.length==0){
        this.no_ideas=true;
        this.checkIdeaService.changeIdeaStatus(this.no_ideas);
       }
        traderSubsribe.getAdviosrIdeas = false;
      }
    })
  }
}