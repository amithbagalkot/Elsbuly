import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvisorComponent } from './advisor/advisor.component';
import { AdvisorRoutingModule } from './advisor-routing.module';
import { TradersModule } from '../traders/traders.module'
@NgModule({
  imports: [
    CommonModule,
    AdvisorRoutingModule,
    TradersModule
  ],
  declarations: [AdvisorComponent]
})
export class AdvisorModule { }
