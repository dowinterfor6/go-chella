import { RECEIVE_ONE_USER } from '../actions/user_actions';

const userReducer = (state={}, action) => {
    Object.freeze(state);
    
    switch (action.type) {
        case RECEIVE_ONE_USER:
            return action.user.data;
        default:
            return state;
    }
}

export default userReducer;