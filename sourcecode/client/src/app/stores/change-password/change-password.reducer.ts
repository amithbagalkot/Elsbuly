import { INITIAL_STATE } from '../change-password/change-password.initial';
import { IChange_Password } from '../change-password/change-password.types';
import { CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR } from '../../constants/login.constants';

export function changePasswordReducer(state: IChange_Password = INITIAL_STATE, action) {
    switch (action.types) {
        case CHANGE_PASSWORD_SUCCESS:
            state.hasPasswordChanged = true;
            state.hasError = false,
            state.error = null
            return state;
        case CHANGE_PASSWORD_ERROR:
            state.hasPasswordChanged = false;
            state.hasError = true;
            state.error = action.payload.message
            return state;
        default:
            return state
    }
}