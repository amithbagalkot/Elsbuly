import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradersComponent } from './traders/traders.component';
import { TradersRoutingModule } from './traders-routing.module';
import { SharedModule } from '../../shared/shared.module'
import { TraderIdeaComponent } from './trader-idea/trader-idea.component';
import { IdeaModule } from '../idea/idea.module';
import { TraderIdeasComponent } from './trader_All_ideas/trader-ideas.component';
import { TraderDashboardComponent } from './trader-dashboard/trader-dashboard.component';
import { TraderSubscriptionsComponent } from './trader-subscriptions/trader-subscriptions.component';

import { MatButtonModule, MatCheckboxModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    TradersRoutingModule,
    IdeaModule,
    SharedModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule
  ],
  declarations: [TradersComponent, TraderIdeaComponent, TraderIdeasComponent, TraderDashboardComponent, TraderSubscriptionsComponent],
})
export class TradersModule { }
