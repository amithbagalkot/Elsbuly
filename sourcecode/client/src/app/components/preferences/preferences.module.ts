import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PreferencesRoutingModule } from './preference-routing.module';
import { PreferencesComponent } from './preferences/preferences.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule( {
    imports: [CommonModule,  SharedModule, PreferencesRoutingModule, ],
    declarations: [PreferencesComponent],
    exports: [PreferencesComponent]
})

export class PreferencesModule {

}

