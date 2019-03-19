import { NgModule } from '@angular/core';
import { PreferencesComponent } from './preferences/preferences.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {   
        path : '',
        component: PreferencesComponent,
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PreferencesRoutingModule {

}