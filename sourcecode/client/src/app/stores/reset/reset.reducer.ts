import { INITIAL_STATE } from "../reset/reset.initial";
import { PASSWORD_RESET_CONFIRM, PASSWORD_RESET_ERROR } from "../../constants/reset.constants";
import { IReset } from "./reset.types";

export function resetReducer(state: IReset = INITIAL_STATE, action) {
    switch (action.type) {
        
        case PASSWORD_RESET_CONFIRM:
            state.hasPasswordReset = true;
            state.hasError = false;
            state.error = null;
            return state;

        case PASSWORD_RESET_ERROR:
            state.hasPasswordReset = false;
            state.hasError = true;
            state.error = action.payload.message;
            return state;

        default:
            return state;
    }
}