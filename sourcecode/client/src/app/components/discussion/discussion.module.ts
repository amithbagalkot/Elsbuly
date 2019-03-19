import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscussionRoutingModule } from './discussion-routing.module';


import { DiscussionDetailComponent } from './discussion-detail/discussion-detail.component';
import { DiscussionExitComponent } from './discussion-exit/discussion-exit.component';
import {DiscussionJoinComponent}  from './discussion-join/discussion-join.component';
import {SharedModule } from "../../shared/shared.module";

import{ FormsModule} from '@angular/forms';
import { DiscussionUserListComponent } from './discussion-user-list/discussion-user-list.component';
import { DiscussionUserItemComponent } from './discussion-user-item/discussion-user-item.component';

@NgModule({
    imports:[
        CommonModule,
        DiscussionRoutingModule,
        FormsModule,
        SharedModule
    ],
    declarations:[DiscussionJoinComponent, DiscussionDetailComponent, DiscussionExitComponent, DiscussionUserListComponent, DiscussionUserItemComponent]
})

export class DiscussionModule{}