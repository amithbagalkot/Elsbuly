import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DiscussionDetailComponent } from './discussion-detail/discussion-detail.component';
import { DiscussionExitComponent } from './discussion-exit/discussion-exit.component';
import {DiscussionJoinComponent}  from './discussion-join/discussion-join.component';

const routes: Routes = [
    
    // {
    //     path: '',
    //     component: DiscussionJoinComponent
    // },
    {
        path: 'exit/:id',
        component: DiscussionExitComponent
    },
    {
        path: 'detail/:id/:ideaBoardId',
        component:DiscussionDetailComponent
    },
    {
        path: 'join/:id',
        component:DiscussionJoinComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DiscussionRoutingModule { }
