import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TraderActions } from '../../../actions/trader.actions';
import { select, select$, NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores/';
//import {MatDialog} from '@angular/material';
//import {TraderdialogComponent} from '../traderdialog/traderdialog.component';
@Component({
  selector: 'app-trader-subscriptions',
  templateUrl: './trader-subscriptions.component.html',
  styleUrls: ['./trader-subscriptions.component.css']
})
export class TraderSubscriptionsComponent implements OnInit {

  trader_subscriptions;
  trader_subscription: boolean = true;
  no_subscriptions: boolean = false;
  displayColumns = ["AdvisorName", "Ideas", "UnSubscribe"];

  constructor(private ngRedux: NgRedux<IAppState>, private traderactions: TraderActions) { }
  @ViewChild('scroller') private myScrollContainer: ElementRef;
  ngOnInit() {
    this.traderactions.getSubscriptions();
    this.ngRedux.subscribe(() => {
      var traderSubsribe = this.ngRedux.getState().traderSubsribe;
      if (traderSubsribe.getTraderSubscriptions) {
        this.trader_subscription = true;
        this.trader_subscriptions = traderSubsribe.getSubscriptions;
        this.no_subscriptions = false;
        if (this.trader_subscriptions.length == 0) {
          this.no_subscriptions = true;
          this.trader_subscription = false;
        }
      }
    })

    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.ScrollBottom = this.myScrollContainer.nativeElement.scrollIntoView();
    } catch (err) {
      console.log(err)
     }
  }
  cancelSubscription(advisor_id, index) {
    if (confirm("Are you sure, you want unsubscribe the advisor? if u did the unsubscribe you won't get the ideas of that advisor")) {
      this.traderactions.cancelSubscriptions(advisor_id);
     this.trader_subscriptions=  this.trader_subscriptions.splice(index, 1);
    }
   }
}