import { Component, OnInit, ViewChild } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores/';
import { TraderActions } from '../../../actions/trader.actions';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AdvisorActions } from '../../../actions/advisor.actions';

@Component({
  selector: 'app-traders',
  templateUrl: './traders.component.html',
  styleUrls: ['./traders.component.css']
})
export class TradersComponent implements OnInit {
  adviosordata: any;
  advisor_data: any;
  tradername;
  trader_id;
  trader_subscriptions;
  subscbribed: boolean = false;
  advisorId;
  advisor_name;
  advisorData;
  advisornames = [];
  advisorname: boolean = false;
  tradersubscribed_Adviosr_ideas;
  displayedColumns: string[] = ['AdviosrName', 'Exchange', 'Cost of Idea', 'Ratings', 'Subscribe'];

  constructor(private toastr: ToastsManager, private ngRedux: NgRedux<IAppState>, private advisoraction: AdvisorActions, private traderactions: TraderActions) { }
  
  ngOnInit() {
    // this.advisor_data = this.advisorservice.getData();
    this.advisoraction.getAdvisors();
    this.traderactions.getSubscriptions();
    this.ngRedux.subscribe(() => {
      var traderSubsribe = this.ngRedux.getState().traderSubsribe;
      var state =this.ngRedux.getState();
      this.advisor_data=state.advisor.result;
      /*--------- create subscriptions of trader------------ */
      if (traderSubsribe.subScribe) {
        var i = 0;
        var data = traderSubsribe.result[i];
        var data1 = data[i]
        var trader_advisor_subsciption = data1['@o_return_value']
        if (trader_advisor_subsciption == 'TRADER_ADVISOR_SUBSCRIBTION_EXIST') {
          this.toastr.success("Already subscribed");
          this.subscbribed= false;
          traderSubsribe.subScribe = false

        } else {
          traderSubsribe.subScribe = false;
          this.toastr.success("Subscribed the advisor");
        }
      }
      /*--------getting subscritions of trader------------------- */
      if (traderSubsribe.getTraderSubscriptions) {
        this.trader_subscriptions = traderSubsribe.getSubscriptions;
        // for (var i = 0; i < this.trader_subscriptions.length; i++) {
        //   this.advisor_name = this.trader_subscriptions[i].user_name
        // getting advisorid of trader subscribed
        //   //this.advisorData = this.advisor_data.find(data => data.advisorid === this.advisorId);
        //   traderSubsribe.getTraderSubscriptions = false;
        //   this.advisornames.push(this.advisor_name)  //getting advisorname of trader subscribed
        // }
      }
    })
  }
  subscribe(advisorinfo) {
    this.adviosordata = {
      advisorId: advisorinfo.user_id,
      advisoremail: advisorinfo.email_id,
      advisorname: advisorinfo.user_name
    };
    this.traderactions.subscribe(this.adviosordata);
  }
}