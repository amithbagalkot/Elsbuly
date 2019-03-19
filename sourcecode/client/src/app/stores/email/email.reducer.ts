import { INITIAL_STATE } from './email.initial';
import { IEmail } from './email.types';
import { SEND_EMAIL_SUCCESS, Send_Email_ERROR } from '../../constants/email.constants';
export function emailReducer(state: IEmail = INITIAL_STATE, action) {
    switch (action.type) {
        case SEND_EMAIL_SUCCESS:
            state.sendSuccess = true;
            state.err = false;
            state.result = action.payload.data;
            return state;
        case Send_Email_ERROR:
            state.sendSuccess = false;
            state.err = true;
            return state;
        default:
            return state    
            //state.hasError = action.payload.message;
    }
}