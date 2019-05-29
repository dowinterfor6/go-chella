import { RECEIVE_GROUP, REMOVE_GROUP } from '../actions/group_actions';
import { RECEIVE_USER_GROUPS } from '../actions/user_actions';
import merge from 'lodash/merge';

const groupsReducer = (state={}, action) => {
  Object.freeze(state); 
  let nextState = merge({}, state);

  switch (action.type) {
    case RECEIVE_USER_GROUPS:
      return action.groups;
    case RECEIVE_GROUP:
      nextState = merge({}, state, action.group)
      return nextState;
    case REMOVE_GROUP:
      delete nextState[action.groupId];
      return nextState;
    default:
      return state;
  }
}

export default groupsReducer;