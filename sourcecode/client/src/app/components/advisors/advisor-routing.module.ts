import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdvisorIdeaComponent} from './advisor-idea/advisor-idea.component';
const routes: Routes = [
  {
    path:'',
    component:AdvisorIdeaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvisorRoutingModule { }
