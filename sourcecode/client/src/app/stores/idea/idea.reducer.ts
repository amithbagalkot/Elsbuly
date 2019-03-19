import { IDEA_CREATED, IDEA_UPDATED, IDEA_DELETED, GET_IDEA } from '../../constants/idea.constant';
import { IIdea, IIdeaStore } from './idea.types';
import { INITIAL_STATE } from './idea.initial';

export function ideaReducer(state: IIdeaStore = INITIAL_STATE, action) {
    switch (action.type) {

        case IDEA_CREATED:
            state.ideaCreated= true;
            state.hasError = false;
            state.message = action.payload.meta.statusCode;
            return state;

        case GET_IDEA:
            state.GetIdea = true;    
            state.hasError = false;
            state.result = action.payload.data;
            return state

        case IDEA_UPDATED:

            return state;

        case IDEA_DELETED:

            return state;

        default:
            return state;
    }
}