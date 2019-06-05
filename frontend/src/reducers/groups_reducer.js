import { RECEIVE_GROUP, REMOVE_GROUP } from '../actions/group_actions';
import { RECEIVE_USER_GROUPS, RECEIVE_USER } from '../actions/user_actions';
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
        currentGroup = merge({}, currentGroup, {actsInfo: [action.act.data]});
      } else {
        currentGroup.actsInfo.push(action.act.data);
      }
      return merge({}, state, {[currentGroup.id]: currentGroup});
    case RECEIVE_USER:
      console.log(state);
      console.log(action);
      currentGroup = state[action.currentGroupId];
      if (!currentGroup.memberInfo) {
        currentGroup = merge({}, currentGroup, { memberInfo: [action.user] });
      } else {
        currentGroup.memberInfo.push(action.user);
      }
      return merge({}, state, { [currentGroup.id]: currentGroup });
    case RECEIVE_USER_GROUPS:
      return action.groups;
    case RECEIVE_GROUP:
      nextState = merge({}, state, {[action.group.data.id]: action.group.data})
      return nextState;
    case REMOVE_GROUP:
      delete nextState[action.groupId];
      return nextState;
    default:
      return state;
  }
}

export default groupsReducer;