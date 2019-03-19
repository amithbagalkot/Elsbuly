import { INITIAL_STATE } from './discussion-exit.initial';
import { IDiscussionExit } from './discussion-exit.types';
import {
    DISCUSSION_EXIT_SUCCESS, DISCUSSION_EXIT_ERROR,
} from '../../constants/discussion-exit.constant';


export function discussionExitReducer(state: IDiscussionExit = INITIAL_STATE, action) {
    switch (action.type) {
        case DISCUSSION_EXIT_SUCCESS:
        state.userExit=true;
        state.hasError=false;
        return state;

        case DISCUSSION_EXIT_ERROR:
        state.userExit=false;
        state.hasError=false;
        return state;

        default:
        return state
        }
}