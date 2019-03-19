import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from "../../shared/shared.module";
import { TraderDashboardComponent } from './trader-dashboard/trader-dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [DashboardComponent, TraderDashboardComponent]
})
export class DashboardModule { }
  