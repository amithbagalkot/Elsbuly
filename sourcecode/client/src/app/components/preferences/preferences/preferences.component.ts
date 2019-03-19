import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PreferenceService } from '../../../services/preference.service';
import { PushNotificationsService } from '../../../services/pushNotifications.service';
import { PreferenceNotificationAction } from '../../../actions/preferenceNotification.action';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../stores';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  constructor(public preferenceService: PreferenceService, private notificationService: PushNotificationsService,
    private preferenceNotification: PreferenceNotificationAction, public ngRedux: NgRedux<IAppState>) { }
  res: any;
  preferenceChecked = [
    {
      name: 'ideaPreference',
      checked: true
    },
    {
      name: 'advisorPreference',
      checked: true
    },
    {
      name: "profilePreference",
      checked: true,
    },
    {
      name: 'pushNotification',
      checked: true,
    },
    {
      name: 'emailPushNotification',
      checked: true
    },
    {
      name: 'smsNotification',
      checked: true
    }
  ]
  ngOnInit() {
    const getPreference = this.preferenceNotification.getNotifications();
    this.ngRedux.subscribe(() => {
      var state = this.ngRedux.getState().preferences;
      if (state.get_notifications === true) {
        this.res = state.get_notification_data;
        for (let i = 0; i < this.res.length; i++) {
          const check = this.res[i];
          if (check.idea_preference === 0) {
            this.preferenceChecked[0].checked = false;
            this.preferenceService.ideaPreferenceChanges(this.preferenceChecked[0].checked)
          }
          if (check.advisor_preference === 0) {
            this.preferenceChecked[1].checked = false;
            this.preferenceService.advisorPreferenceChanges(this.preferenceChecked[1].checked)
          }
          if (check.profile_preference === 0) {
            this.preferenceChecked[2].checked = false;
            this.preferenceService.profilePreferenceChanges(this.preferenceChecked[2].checked)
          }
          if (check.push_notification === 0) {
            this.preferenceChecked[3].checked = false;
          }
          if (check.email_notification === 0) {
            this.preferenceChecked[4].checked = false;
          }
          if (check.sms_notification === 0) {
            this.preferenceChecked[5].checked = false;
          }
        }
      }
    })
  }

  preferences(event, i) {
    if (event.target.checked) {
      this.preferenceChecked[i].checked = true;
      const data = this.preferenceChecked[i]
      if (data.name === 'ideaPreference') {
        this.preferenceService.ideaPreferenceChanges(true)
      }
      if (data.name === 'advisorPreference') {
        this.preferenceService.advisorPreferenceChanges(true)
      }
      if (data.name === 'profilePreference') {
        this.preferenceService.profilePreferenceChanges(true)
      }
      this.preferenceNotification.ideaPreference(data);
    }
    if (!event.target.checked) {
      this.preferenceChecked[i].checked = false;
      const data = this.preferenceChecked[i];
      if (data.name === 'ideaPreference') {
        this.preferenceService.ideaPreferenceChanges(false)
      }
      if (data.name === 'advisorPreference') {
        this.preferenceService.advisorPreferenceChanges(false)
      }
      if (data.name === 'profilePreference') {
        this.preferenceService.profilePreferenceChanges(false)
      }
      this.preferenceNotification.ideaPreference(data);
    }
  }
  notify() {
    this.notificationService.subscribeToUser();
  }
}
