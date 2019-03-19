import { INITIAL_STATE } from './trader.initial';
import { ITrader } from './trader.types';
import { TRADER_SUBSCIRBE_ERROR, TRADER_SUBSCRIBE_SUCCESS,TRADER_GET_SUBSCRIPTIONS_SUCCESS,TRADER_GET_SUBSCRIPTIONS_ERROR, TRADER_SUBSCRIBE_ADVIOSR_IDEAS_SUCCESS, TRADER_SUBSCRIBE_ADVIOSR_IDEAS_ERROR,CANCEL_SUBSCRIPTION_SUCCESS,CANCEL_SUBSCRIPTION_ERROR} from '../../constants/trader.constant';

export function traderReducer(state: ITrader = INITIAL_STATE, action) {
    switch (action.type) {
        case TRADER_SUBSCRIBE_SUCCESS:
                state.subScribe = true,
                state.hasError = false,
                state.error = null,
                state.result = action.payload.data
            return state
        case TRADER_SUBSCIRBE_ERROR:
                state.subScribe = false,
                state.hasError = true,
                state.error = action.payload.message
            return state
        case TRADER_SUBSCRIBE_ADVIOSR_IDEAS_SUCCESS:
                state.getAdviosrIdeas=true;
                state.hasError = false,
                state.result = action.payload.data
            return state
        case TRADER_SUBSCRIBE_ADVIOSR_IDEAS_ERROR:
                state.getAdviosrIdeas=false;
                state.hasError = true,
                state.error = action.payload.message
            return state
        case TRADER_GET_SUBSCRIPTIONS_SUCCESS:
                 state.getSubscriptions = action.payload.data;
                 state.getTraderSubscriptions=true;
           return state
        case  TRADER_GET_SUBSCRIPTIONS_ERROR:
                 state.getTraderSubscriptions=false;
                 state.error = action.payload.message
           return state

        case CANCEL_SUBSCRIPTION_SUCCESS:
                  state.cancelSubscription =true;
            return state
        case CANCEL_SUBSCRIPTION_ERROR:
                  state.hasError = true,
                  state.error = action.payload.message
            return state
        default:
            return state
    }
}

