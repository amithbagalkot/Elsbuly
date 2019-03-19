import { INITIAL_STATE } from './common.initial';
import { ICommon } from './common.types';
import {
    GET_SEGMENT_SUCCESS, GET_COUNTRY_SUCCESS,
    GET_EXCHANGE_SUCCESS, GET_INSTRUMENT_SUCCESS, GET_REGION_SUCCESS, GET_SCRIPT_SUCCESS, GET_ERROR
} from '../../constants/common.constant';


export function commonReducer(state: ICommon = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_SEGMENT_SUCCESS:
        state.result=true;
        state.segmentData = true;
        state.segment = action.payload.data;
        state.hasError=false;
        return state;

        case GET_COUNTRY_SUCCESS:
            state.result = true;
            state.hasError = false;
            state.country = action.payload.data
            return state;

        case GET_EXCHANGE_SUCCESS:
            state.exchangeData=true;
            state.hasError = false;
            state.exchange = action.payload.data
            state.exchange_id = action.payload.data;
            return state;

        case GET_INSTRUMENT_SUCCESS:
        state.result=true;
        state.instrumentData = true;
        state.instrument = action.payload.data;
        state.hasError=false;
        return state;

        case GET_REGION_SUCCESS:
        state.result=true;
        state.hasError=false;
        return state;

        case GET_SCRIPT_SUCCESS:
            state.scriptData=true;
            state.hasError = false;
            state.script = action.payload.data
            state.script_id = action.payload.data.script_id;
            return state;

        case GET_ERROR:
        state.result=false;
        state.hasError=true;
        return state;
        default:
        return state
        }
}