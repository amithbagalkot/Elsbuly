import { INITIAL_STATE } from './get_discussion_initial';
import { IGetDiscussionUser } from './get_discussion_user_types';
import { GET_DISCUSSION_USER_SUCCESS, GET_DISCUSSION_USER_ERROR, GET_IDEA_BOARD_TRADER  } from '../../constants/discussion_user.constants';
export function getdiscussionReducer(state: IGetDiscussionUser = INITIAL_STATE, action) {
    var first_element=0;
    switch (action.type) {
      
        case GET_DISCUSSION_USER_SUCCESS:
       

        state.getideaBoardsuccess = true;
        state.hasError = false;
        state.getIdeaBoard = action.payload.data;
        return state;



           if(action.payload.data[0].discussion_board_type=="consectetur"){
            state.GetdiscussionUser = true;
            state.result1 = action.payload.data;
            state.hasError = false;
            return state;
           }
           if(action.payload.data[0].discussion_board_type=="condimentum"){
            state.GetdiscussionUser = true;
            state.result2 = action.payload.data;
            state.hasError = false;
            return state;
           }
           if(action.payload.data[0].discussion_board_type=="bibendum"){
            state.GetdiscussionUser = true;
            state.result3 = action.payload.data;
            state.hasError = false;
            return state;
           }
            
           if(action.payload.data[0].discussion_board_type=="eget"){
            state.GetdiscussionUser = true;
            state.result4 = action.payload.data;
            state.hasError = false;
            return state;
           }
            
           if(action.payload.data[0].discussion_board_type=="tempus"){
            state.GetdiscussionUser = true;
            state.result5 = action.payload.data;
            state.hasError = false;
            return state;
           }
            
           if(action.payload.data[0].discussion_board_type=="cell1_1"){
            state.GetdiscussionUser = true;
            state.result6 = action.payload.data;
            state.hasError = false;
            return state;
           }
        case GET_DISCUSSION_USER_ERROR:
            state.GetdiscussionUser = false;
            state.hasError = true;
            return state;

        case GET_IDEA_BOARD_TRADER:
        state.getIdeaBoardTrader = true;
        state.getIdeaBoardTraderUser = action.payload.data;
        default:
            return state
    }
}