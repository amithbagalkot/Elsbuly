import { INITIAL_STATE } from './advisor.initial';
import { ADVISOR_GET_SUBSCRIPTIONS_SUCCESS,ADVISOR_GET_SUBSCRIPTIONS_ERROR,ADVISOR_GET_SUCCESS,ADVISOR_GET_ERROR } from "../../constants/advisor.constants";
import { IAdvisorStore } from "./advisor.types";
export function advisorReducer(
  state:IAdvisorStore = INITIAL_STATE,action) {

  switch (action.type) {

    case ADVISOR_GET_SUBSCRIPTIONS_SUCCESS:
        state.getsubscriptions = true;
        state.result=action.payload.data
        state.hasError = false;
        state.error = null;
        return state;
    case ADVISOR_GET_SUBSCRIPTIONS_ERROR:
        state.hasError = true;
        state.error = action.payload.message;
        return state;
    case ADVISOR_GET_SUCCESS:
        state.hasError = false;
        state.getAdvisors=true;
        state.result = action.payload.data;
        return state;   
    case ADVISOR_GET_ERROR:
        state.hasError = true;
        state.error = action.payload.message;
        return state;     
    default:
      return state;
  }
}
