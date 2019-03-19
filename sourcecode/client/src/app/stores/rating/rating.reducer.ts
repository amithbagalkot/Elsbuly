import { INITIAL_STATE } from './rating.initial';
import { STAR_RATING_SUCCESS, STAR_RATING_ERROR,GET_STAR_RATING_SUCCESS,GET_STAR_RATING_ERROR } from "../../constants/rating.constant";
import { IRating } from "./rating.types";



export function ratingReducer(state: IRating = INITIAL_STATE, action) {
    
    switch (action.type) {
        case STAR_RATING_SUCCESS:
                state.isRating = true,
                state.hasError = false,
                state.error = null,
                state.isLoading = false,
                state.result = action.payload
            return state;
        case STAR_RATING_ERROR:
                state.isRating = false,
                state.hasError = true,
                state.error = action.payload.message,
                state.isLoading = false,
                state.result = null
            return state;
        case GET_STAR_RATING_SUCCESS:
               state.isRating = true,
               state.hasError = false,
               state.error = null,
               state.isLoading = false,
               state.result = action.payload.data
        return state;
        case GET_STAR_RATING_ERROR:
               state.isRating = false,
               state.hasError = true,
               state.error = action.payload.message,
               state.isLoading = false,
               state.result = null
        return state;
        default:
            return state;
    }
}