import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/authGuard.service';
import { AuthTraderGuardService } from './services/authTraderGuard.service';
import { AdvisorGuard } from './services/advisorGuard.service';

const routes: Routes = [
    {
        path: '',
        loadChildren: 'app/components/welcome/welcome.module#WelcomeModule'
    },
    {
        path: 'login',
        loadChildren: 'app/components/auth/auth.module#AuthModule',
    },
    {
        path: 'dashboard',
        loadChildren: 'app/components/dashboard/dashboard.module#DashboardModule',
        canLoad: [AuthGuardService]
    },
    {
        path: 'register',
        loadChildren: 'app/components/register/register.module#RegisterModule'

    },
    {
        path: 'reset',
        loadChildren: 'app/components/auth/auth.module#AuthModule',
    },
    {
        path: 'Ideas',
        loadChildren: 'app/components/idea/idea.module#IdeaModule',
        canLoad: [AuthGuardService]
    },
    {
        path: 'idea',
        loadChildren: 'app/components/idea/idea.module#IdeaModule',
        canLoad: [AuthGuardService]
    },
    // {
    //     path: 'discussion/detail/:ideaid',
    //     loadChildren: 'app/components/discussion/discussion.module#DiscussionModule',
    //     canLoad: [AuthGuardService]
    // },
    {
        path: 'discussion',
        loadChildren: 'app/components/discussion/discussion.module#DiscussionModule',
        // canLoad: [AuthGuardService]
    },
    {
        path: 'wallet',
        loadChildren: 'app/components/wallet/wallet.module#WalletModule',
        canLoad: [AuthGuardService]
    },
    {
        path: 'trader',
        loadChildren: 'app/components/traders/traders.module#TradersModule',
        canLoad: [AuthGuardService]
    },
    {
        path: 'Ratings',
        loadChildren: 'app/components/rating/rating.module#RatingModule'
    },
    {
        path: 'profile',
        loadChildren: 'app/components/user-profile/user-profile.module#UserProfileModule'
    },
    {
        path: 'preferences',
        loadChildren: 'app/components/preferences/preferences.module#PreferencesModule'
    },
    {
        path: '**',
        loadChildren: 'app/components/page-not-found/page-not-found.module#PageNotFoundModule'
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
