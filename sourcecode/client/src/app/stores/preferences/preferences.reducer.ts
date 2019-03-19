import { INITIAL_STATE } from './preferences.initial';
import { IPreferences } from './preferences.types';
import * as Preferences from '../../constants/preferences.constant';

export function preferenceReducer(state: IPreferences = INITIAL_STATE, action) {
    switch (action.type) {
        case Preferences.IDEA_PREFERENCES_SUCCESS:
            state.error = null;
            state.isEnable = true;
            state.hasError = false;
            state.get_notification_data = action.payload;
            return state;

        case Preferences.IDEA_PREFERENCES_ERROR:
            state.error = action.payload;
            state.isEnable = false;
            state.hasError = false;
            return state;

        case Preferences.ADVISOR_PREFERENCES_SUCCESS:
            state.error = null;
            state.isEnable = true;
            state.hasError = false;
            state.get_notification_data = action.payload;
            return state;

        case Preferences.ADVISOR_PREFERENCES_ERROR:
            state.error = action.payload;
            state.isEnable = false;
            state.hasError = true;
            return state;

        case Preferences.PROFILE_PREFERENCES_SUCCESS:
            state.error = null;
            state.isEnable = true;
            state.hasError = false;
            state.get_notification_data = action.payload;
            return state;

        case Preferences.PROFILE_PREFERENCES_ERROR:
            state.error = action.payload;
            state.isEnable = false;
            state.hasError = true;
            return state;

        case Preferences.PUSH_NOTIFICATION_SUCCESS:
            state.error = null;
            state.isEnable = true;
            state.hasError = false;
            state.get_notification_data = action.payload;
            return state;

        case Preferences.PUSH_NOTIFICATION_ERROR:
            state.error = action.payload;
            state.isEnable = false;
            state.hasError = true;
            return state;

        case Preferences.EMAIL_NOTIFICATION_SUCCESS:
            state.error = null;
            state.isEnable = true;
            state.hasError = false;
            state.get_notification_data = action.payload;
            return state;

        case Preferences.EMAIL_NOTIFICATION_ERROR:
            state.error = action.payload;
            state.isEnable = false;
            state.hasError = true;
            return state;

        case Preferences.SMS_NOTIFICATION_SUCCESS:
            state.error = null;
            state.isEnable = true;
            state.hasError = false;
            state.get_notification_data = action.payload;
            return state;

        case Preferences.SMS_NOTIFICATION_ERROR:
            state.error = action.payload;
            state.isEnable = false;
            state.hasError = true;
            return state;

        case Preferences.GET_NOTIFICATION_SUCCESS:
            state.error = null;
            state.hasError = false;
            state.get_notifications = true;
            state.get_notification_data = action.payload.res.data;
            console.log(state.get_notification_data);
            return state;

        case Preferences.GET_NOTIFICATION_ERROR:
            state.error = action.payload;
            state.isEnable = false;
            state.get_notifications = false;
            state.hasError = true;
            return state;

        default:
            return state;
    }
}