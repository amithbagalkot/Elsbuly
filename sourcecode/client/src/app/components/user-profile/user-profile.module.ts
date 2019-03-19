import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileRouting } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, UserProfileRouting, SharedModule],
    declarations: [UserProfileComponent]
})



export class UserProfileModule {}    