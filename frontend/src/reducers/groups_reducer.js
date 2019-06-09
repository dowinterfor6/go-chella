import { RECEIVE_GROUP, REMOVE_GROUP } from '../actions/group_actions';
import { RECEIVE_USER_GROUPS, RECEIVE_USER, RECEIVE_OWNER } from '../actions/user_actions';
import merge from 'lodash/merge';
import { RECEIVE_ACT } from '../actions/act_actions';

const groupsReducer = (state={}, action) => {
  Object.freeze(state); 
  let nextState = merge({}, state);
  let currentGroup;
  switch (action.type) {
    case RECEIVE_ACT:
      currentGroup = state[action.currentGroupId];
      if (!currentGroup.actsInfo) {
        currentGroup.actsInfo = {[action.act.data._id]: action.act.data}
      } else {
        currentGroup.actsInfo[action.act.data._id] = action.act.data;
      }
      return merge({}, state, {[currentGroup.id]: currentGroup});
    case RECEIVE_USER:
      currentGroup = state[action.currentGroupId];
      if (!currentGroup.memberInfo) {
        currentGroup.memberInfo = { [action.user.id]: action.user }
      } else {
        currentGroup.memberInfo[action.user.id] = action.user;
      }
      return merge({}, state, { [currentGroup.id]: currentGroup });
    case RECEIVE_OWNER:
      currentGroup = state[action.currentGroupId];
      currentGroup.owner = action.user;
      return merge({}, state, { [currentGroup.id]: currentGroup });
    case RECEIVE_USER_GROUPS:
      return action.groups;
    case RECEIVE_GROUP:
      if(action.group.data._id) {
        nextState = merge({}, state, {[action.group.data._id]: action.group.data})
      } else {
        nextState = merge({}, state, {[action.group.data.id]: action.group.data})
      }
      return nextState;
    case REMOVE_GROUP:
      delete nextState[action.groupId];
      return nextState;
    default:
      return state;
  }
}

export default groupsReducer;