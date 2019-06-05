import { DISPLAY_ACT } from '../actions/act_actions';

const actsReducer = (state={}, action) => {
    Object.freeze(state);
    
    switch (action.type) {
        case DISPLAY_ACT:
            return action.act.data;
        default:
            return state;
    }
}

export default actsReducer;