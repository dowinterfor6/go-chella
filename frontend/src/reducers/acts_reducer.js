import { RECEIVE_ACT, REMOVE_ACTS, RECEIVE_ACTS } from '../actions/act_actions';
import merge from 'lodash/merge';

const actsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    // case RECEIVE_ACT:
    //   console.log(state);
    //   console.log(action);
    //   let acts = state.groups[action.currentGroupId];
    //   return merge({}, state, { [action.act.data._id]: action.act.data});
    case RECEIVE_ACTS:
      return action.acts;
    case REMOVE_ACTS:
      return {};
    default:
      return state;
  }
}

export default actsReducer;