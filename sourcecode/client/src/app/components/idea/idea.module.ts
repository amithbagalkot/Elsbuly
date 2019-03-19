import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { IdeaRoutingModule } from './idea-routing.module';
import { IdeaComponent } from './idea/idea.component';
import { IdealistComponent } from './idea-list/idea-list.component';
//import { TradersComponent } from '../traders/traders/traders.component'; 
import { AdvisorIdeaComponent } from '../advisors/advisor-idea/advisor-idea.component';
import { IdeaGenerateComponent } from './idea-generate/idea-generate.component';
import { SharedModule } from "../../shared/shared.module";
import { FilterPipe } from '../../filter/filter.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule, MatInputModule  } from '@angular/material';

//import { ModalModule } from 'ng2-modal-dialog/modal.module';
@NgModule({
    imports: [
        CommonModule,
        IdeaRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxSpinnerModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule
        //ModalModule
    ],
    declarations: [IdeaComponent, IdealistComponent, AdvisorIdeaComponent,IdeaGenerateComponent, FilterPipe],
    exports: [IdeaComponent,IdealistComponent]
})

export class IdeaModule {
}