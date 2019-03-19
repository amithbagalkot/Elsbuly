import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module'
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
    imports : [CommonModule, WelcomeRoutingModule, FormsModule, SharedModule],
    declarations: [WelcomeComponent]
})

export class WelcomeModule {

}