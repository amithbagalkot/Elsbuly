import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadingStrategy } from '@angular/router';
import { IdeaComponent } from './idea/idea.component'
import { IdealistComponent } from './idea-list/idea-list.component';
import { AdvisorIdeaComponent } from '../../components/advisors/advisor-idea/advisor-idea.component';
// import { TraderIdeaComponent } from '../../components/traders/trader-idea/trader-idea.component';
import { IdeaGenerateComponent } from './idea-generate/idea-generate.component';
import { TradersComponent } from '../../components/traders/traders/traders.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
    {
        path:"",
        component:AdvisorIdeaComponent,
        
    },
    {
        path: "",
        component: IdeaComponent
    },
    {
        path: "Generate",
        component: IdeaGenerateComponent
    },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class IdeaRoutingModule {
}
