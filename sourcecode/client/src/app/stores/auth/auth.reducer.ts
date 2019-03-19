import { INITIAL_STATE } from './auth.initial';
import { LOGIN_USER_SUCCESS, LOGIN_USER_ERROR, LOGOUT_USER } from "../../constants/login.constants";
import { IAuthStore } from "./auth.types";
export function authReducer(
    state: IAuthStore = INITIAL_STATE, action) {

    switch (action.type) {

        case LOGIN_USER_SUCCESS:
            state.loggedIn = true;
            state.hasError = false;
            state.isLoading = false;
            state.error = null;
            state.user_type_id = action.payload.data.user.user_type_id;
            state.userinfo = action.payload.data.user;
            state.user_id = action.payload.data.user.user_id;
            state.loggedInStatus = true;
            return state;

        case LOGIN_USER_ERROR:
            state.loggedIn = false;
            state.hasError = true;
            state.isLoading = false;
            state.error = action.payload.message;
            return state;
            
        case LOGOUT_USER:
            state.loggedIn = false,
                state.hasError = null,
                state.error = null,
                state.isLoading = false,
                state.loggedinUser = null,
                state.user_type_id = null,
                state.user_id = null,
                state.userinfo = null,
                state.loggedOut = true
                state.loggedInStatus = false;
        default:
            return state;
    }
}
