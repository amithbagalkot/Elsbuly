import { INITIAL_STATE } from './discussion-join.initial';
import { IDiscussionJoin } from './discussion-join.types';
import {
    DISCUSSION_JOIN_SUCCESS, DISCUSSION_JOIN_ERROR,GET_IDEAS_SUCCESS, GET_IDEAS_ERROR, GET_IDEA_ID_SUCCESS
} from '../../constants/discussion-join.constant';


export function discussionjoinReducer(state: IDiscussionJoin = INITIAL_STATE, action) {
    switch (action.type) {

        case GET_IDEAS_SUCCESS:
        state.getIdeas=true;
        state.hasError=false;
        state.result=action.payload.data;
        return state;

        case DISCUSSION_JOIN_SUCCESS:
        state.discussionJoin=true;
        state.hasError=false;
        // state.trader_data=action.payload.data;
        return state;

        case GET_IDEA_ID_SUCCESS:
         state.discussionJoin=true;
        state.hasError=false;
        state.result=action.payload.data;
        return state;

        case DISCUSSION_JOIN_ERROR:
        state.discussionJoin=false;
        state.hasError=false;
        return state;

        default:
        return state
        }
}