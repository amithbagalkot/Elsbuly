import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TraderDashboardComponent } from './trader-dashboard/trader-dashboard.component';
import { AuthTraderGuardService } from '../../services/authTraderGuard.service';

const routes: Routes = [
    {
        path:"",
        component:DashboardComponent
    },
    {
        path:"trader",
        component: TraderDashboardComponent,
        canActivate: [AuthTraderGuardService]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
