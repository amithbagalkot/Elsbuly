import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TraderActions } from '../../../actions/trader.actions';
import { select, select$, NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores/';
import { CheckIdeaService } from '../../../services/checkIdea.service';
import { LoadingService } from '../../../services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-trader-ideas',
  templateUrl: './trader-ideas.component.html',
  styleUrls: ['./trader-ideas.component.css']
})
export class TraderIdeasComponent implements OnInit {
  trader_Subsribe_Adviosr_Ideas;
  exchange_code: any;
  exchange_codes=[];
  advisorName: any;
  advisorNames=[];
  Ideas: any;
  newExchange_codes= [];
  newAdvisorNames=[];
  no_ideas:boolean = false;
  isLoading: boolean = true;

  constructor(private ngRedux: NgRedux<IAppState>,private traderactions: TraderActions,  
    private checkIdeaService: CheckIdeaService, private loading: LoadingService,  private spinner: NgxSpinnerService) { };
  ngOnInit() {
      this.traderactions.getAllIdeas();
      this.loading.isLoadingTrueValue.subscribe(value=>{
        this.isLoading=value;
        if(this.isLoading) {
          this.spinner.show();
        }
      });
      this.ngRedux.subscribe(() => {
        var data = this.ngRedux.getState().traderSubsribe;
        this.trader_Subsribe_Adviosr_Ideas=data.result;
        if(this.trader_Subsribe_Adviosr_Ideas != null) {
          if(this.trader_Subsribe_Adviosr_Ideas.length==0){
            this.no_ideas=true;
            this.checkIdeaService.changeIdeaStatus(this.no_ideas);
           }
        }
        
         for (let i = 0; i < this.trader_Subsribe_Adviosr_Ideas.length; i++) {
          this.exchange_code = this.trader_Subsribe_Adviosr_Ideas[i].actual_exchange_code;
          
          this.exchange_codes.push(this.exchange_code);
          this.advisorName = this.trader_Subsribe_Adviosr_Ideas[i].user_name;
          this.advisorNames.push(this.advisorName)
        }
      
      this.newExchange_codes = Array.from(new Set(this.exchange_codes));
      this.newAdvisorNames = Array.from(new Set(this.advisorNames));
        })
  }

}
