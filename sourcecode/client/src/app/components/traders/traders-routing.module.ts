import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TradersComponent} from './traders/traders.component';
import {TraderIdeaComponent} from './trader-idea/trader-idea.component';
import { TraderIdeasComponent } from './trader_All_ideas/trader-ideas.component';
import { TraderDashboardComponent } from './trader-dashboard/trader-dashboard.component';
import { TraderSubscriptionsComponent } from './trader-subscriptions/trader-subscriptions.component';
const routes: Routes = [
  {
    path:'',
    component:TraderDashboardComponent
  },
  {
    path:'subscriptions',
    component:TraderSubscriptionsComponent
  },
  {
    path:'advisors_list',
    component:TradersComponent
  },
  {
    path:'advisorideas/:advisorId',  // getting particular advisor ideas 
    component:TraderIdeaComponent 
  },
  {
    path:'ideas',      // getting all ideas of traders got from advisor
    component:TraderIdeasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradersRoutingModule { }
