import { Component, OnInit } from '@angular/core';
import { RequestSenderService } from '../../../services/request-sender.service';
import { ApiConfig } from '../../../config/index';
import { DiscusionJoinAction } from '../../../actions/discussion-Join.action';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores';
import { RegisterService } from '../../../services/register.service';
import { ResolvePathService } from '../../../services/resolve-path-service.service';
import { PushNotificationsService } from '../../../services/pushNotifications.service';
import { PreferenceService } from '../../../services/preference.service';
import { PreferenceNotificationAction } from '../../../actions/preferenceNotification.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name: string;
  res: any;
  image_name;
  url: any;
  Ideas: any;
  ideaPreference: boolean = true;
  advisorPreference: boolean = true;
  profilePreference: boolean = true;
  user_name;
  first_name;
  email_id;

  constructor(private registerService: RegisterService,
    private discussionJoinAction: DiscusionJoinAction, private ngRedux: NgRedux<IAppState>,
    private resolveService: ResolvePathService, public notificationSerice: PushNotificationsService,
    private preferenceService: PreferenceService, private preferenceNotification: PreferenceNotificationAction) {
    this.notificationSerice.requestPermission();
    this.url = 'https://devserver.elsbuly.com:3000/';
    const state = JSON.parse(localStorage.getItem('state'));
    this.user_name = state.auth.userinfo.user_name;
    this.first_name = state.auth.userinfo.first_name;
    this.email_id = state.auth.userinfo.email_id;
  }

  ngOnInit() {
    this.preferenceNotification.getNotifications();
    this.discussionJoinAction.getIdeas();
    this.ngRedux.subscribe(() => {
      var state = this.ngRedux.getState();
      if (state.discussionJoin.getIdeas) {
        this.Ideas = state.discussionJoin.result;
      }
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
    })
    this.registerService.getImage().subscribe((res) => {
      this.image_name = res.data.image_name;
      if (res.meta.statusCode = 203) {
        this.image_name = "default.png";
      }
      else {
        this.image_name = res.data.image_name;
      }
      console.log(res);
    }, err => {
      console.log(err);
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