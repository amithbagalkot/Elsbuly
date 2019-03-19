import { OTP_SUCCESS, OTP_ERROR, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from '../../constants/register.constant';
import { INITIAL_STATE } from '../register/register.initial';
import { IRegister } from '../register/register.types';


export function regReducer(

    state: IRegister = INITIAL_STATE, action) {
    switch (action.type) {
        case OTP_SUCCESS:
            state.otp = true;
            state.hasError = false;
            state.error = null;
            state.data = action.payload.data
            return state;

        case OTP_ERROR:
            state.otp = false;
            state.hasError = true;
            state.error = action.payload;
            return state;

        case REGISTER_USER_SUCCESS:
            state.registerdUser = true;
            state.hasError = false;
            state.error = null;
            return state;
        
        case REGISTER_USER_ERROR:
            state.registerdUser = false;
            state.hasError = true;
            state.error = action.payload
            return state;
        default:
            return state;
    }
}