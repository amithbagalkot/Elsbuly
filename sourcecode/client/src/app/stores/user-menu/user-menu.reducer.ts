import { INITIAL_STATE } from './user-menu.initial';
import { USERMENU_DATA_SUCCESS, USERMENU_DATA_ERROR } from '../../constants/user-menu.constants';
import { IUserMenu } from "./user-menu.types";
export function userMenuReducer(
    state: IUserMenu = INITIAL_STATE, action) {

    switch (action.type) {

        case USERMENU_DATA_SUCCESS:
            state.userMenuData = true,
                state.hasError = false,
                state.error = null,
                state.isLoading = false,
                state.userDataresult = action.payload.data
            return state;
        case USERMENU_DATA_ERROR:
                state.userMenuData = false,
                state.hasError = true,
                state.error = action.payload.status,
                state.isLoading = false,
                state.userDataresult = null
            return state;
        default:
            return state;
    }
}