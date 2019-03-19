import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        PageNotFoundRoutingModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        PageNotFoundComponent
    ]
})
export class PageNotFoundModule { }