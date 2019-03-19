import { Component, OnInit } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { DiscusionJoinAction } from '../../../actions/discussion-Join.action';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores';
import { ActivatedRoute, Router } from '@angular/router';
import { TraderActions } from '../../../actions/trader.actions';
import { ApiConfig, UrlConfig } from '../../../config/index';
import { RequestSenderService } from '../../../services/request-sender.service';
import { AdvisorActions } from '../../../actions/advisor.actions';
import { ResolvePathService } from '../../../services/resolve-path-service.service';
import { PreferenceService } from '../../../services/preference.service';
import { RegisterService } from '../../../services/register.service';
import { PushNotificationsService } from '../../../services/pushNotifications.service';
import { PreferenceNotificationAction } from '../../../actions/preferenceNotification.action';

@Component({
  selector: 'app-trader-dashboard',
  templateUrl: './trader-dashboard.component.html',
  styleUrls: ['./trader-dashboard.component.css']
})
export class TraderDashboardComponent implements OnInit {
  Ideas: any;
  url;
  image_name;
  name: any;
  state: any;
  advisorId;
  advisor_data;
  jwtHelper: JwtHelper = new JwtHelper();
  ideaPreference: boolean = true;
  advisorPreference: boolean = true;
  profilePreference: boolean = true;
  data: any;
  res: any;
  user_name;
  first_name;
  email_id;
  constructor(public ngRedux: NgRedux<IAppState>,
    private traderactions: TraderActions, private advisorAction: AdvisorActions,
    private resolveService: ResolvePathService, public preferenceService: PreferenceService,
    private registerService: RegisterService, private notificationSerice: PushNotificationsService,
    private preferenceNotification: PreferenceNotificationAction) {
    this.notificationSerice.requestPermission();
    this.state = JSON.parse(localStorage.getItem('state'));
    this.user_name = this.state.auth.userinfo.user_name;
    this.first_name = this.state.auth.userinfo.first_name;
    this.email_id = this.state.auth.userinfo.email_id;
    this.url = 'https://devserver.elsbuly.com:3000/';
    // console.log(this.jwtHelper,
    //   this.jwtHelper.decodeToken(localStorage.token),
    //   this.jwtHelper.getTokenExpirationDate(localStorage.token),
    //   this.jwtHelper.isTokenExpired(localStorage.token));
  }

  ngOnInit() {
    this.preferenceNotification.getNotifications();
    this.advisorAction.getAdvisors()
    this.traderactions.getAllIdeas();
    this.ngRedux.subscribe(() => {

      var state = this.ngRedux.getState();

      if (state.preferences.get_notifications === true) {
        this.res = state.preferences.get_notification_data;
        for (let i = 0; i < this.res.length; i++) {
          const check = this.res[i];
          if (check.idea_preference === 0) {
            this.preferenceService.ideaPreferenceChanges(false)
          }
          if (check.advisor_preference === 0) {
            this.preferenceService.advisorPreferenceChanges(false)
          }
          if (check.profile_preference === 0) {
            this.preferenceService.profilePreferenceChanges(false)
          }
        }
      }
      this.advisor_data = state.advisor.result;
      if (state.traderSubsribe.getAdviosrIdeas) {
        this.Ideas = state.traderSubsribe.result;
      }
    })
    this.registerService.getImage().subscribe((res) => {
      this.image_name = res.data.image_name;
      if (res.meta.statusCode = 203) {
        this.image_name = "default.png";
      }
      else {
        this.image_name = res.data.image_name;
      }
    })

    this.preferenceService.ideaPreferenceValueChange.subscribe((value) => {
      this.ideaPreference = value;
    })
    this.preferenceService.advisorPreferenceValueChange.subscribe((value) => {
      this.advisorPreference = value;
    })
    this.preferenceService.profilePreferenceValueChange.subscribe((value) => {
      this.profilePreference = value;
    })
  }
  navigate(code) {
    this.resolveService.resolve(code);
  }
}
