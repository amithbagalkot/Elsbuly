import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule  } from '@angular/common/http';
import { JsonpModule, Jsonp } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// External Module \\
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatButtonModule, MatCheckboxModule, MatTableModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
// Component \\
import { AppComponent } from './app.component';

// services \\
import { RequestSenderService } from './services/request-sender.service';
import { DiscussionService } from './services/discussion.service';
import { ResolvePathService } from './services/resolve-path-service.service';
import { RegisterService } from './services/register.service';
import { AdvisorService } from './services/advisor-data.service';
import { CountryCodeService } from './services/countryCode.service';
import { PreferenceService } from './services/preference.service';
import {ChatService} from './services/chat.service';
import { CheckIdeaService } from './services/checkIdea.service';
import { LoadingService } from './services/loading.service';


//import { commonService } from './services/common.service';

// Actions \\
import { LoginActions } from './actions/authLogin.actions';
import { UserMenuAction } from './actions/user-menu.action';
import { RegisterAction } from './actions/register.action';
import { AdvisorActions } from './actions/advisor.actions';
import { TraderActions } from './actions/trader.actions';
import { ResetAction } from './actions/reset.action';
import { IdeaActions } from './actions/idea.action';
import { WalletAction } from './actions/wallet.actions';
import { CommonActions } from './actions/common.actions';
import { RatingAction } from './actions/rating.action';
import { DiscusionJoinAction } from './actions/discussion-Join.action';
import {DiscusionExitAction} from './actions/discussion_exit.action';
import { PreferenceNotificationAction } from './actions/preferenceNotification.action'

// AuthGuard Service \\
import { AuthGuardService } from './services/authGuard.service';
import { AdvisorGuard } from './services/advisorGuard.service';
import { AuthTraderGuardService } from './services/authTraderGuard.service';
import { DataResolver } from './data.resolver';
import { ConnectionService } from './services/connection.service';
import { PushNotificationsService } from './services/pushNotifications.service';
import { NgxSpinnerService } from 'ngx-spinner';

// Modules \\
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { SharedModule } from "./shared/shared.module";

// NgRedux \\
import { IAppState, rootReducer } from './stores/index';
import { environment } from "../environments/environment";

//import {ServiceWorkerModule} from '@angular/service-worker';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    AppRoutingModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpBZAtwfYcJT57vSIYlqxovIkJ5bjPaLo',
      libraries: ["places"]
    }),
    NgReduxModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    //ServiceWorkerModule.register('/ngsw-worker.js',{enabled:environment.production})
  ],
  providers: [
   
    ChatService,
    RequestSenderService,
    LoginActions,
    ResolvePathService,
    PreferenceService,
    LoadingService,
    PushNotificationsService,
    ResetAction,
    IdeaActions,
    RatingAction,
    DiscusionJoinAction,
    DiscusionExitAction,
    WalletAction,
    AdvisorActions,
    NgxSpinnerService,
    TraderActions,
    CommonActions,
    PreferenceNotificationAction,
    
    //commonService,
    RegisterAction,
    UserMenuAction,
    RegisterService,
    AdvisorService,
    CountryCodeService,
    AuthGuardService,
    AdvisorGuard,
    AuthTraderGuardService,
    ConnectionService,
    CheckIdeaService,
    DataResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, private router: Router) {
    ngRedux.configureStore(rootReducer, {});
  }
}
 
