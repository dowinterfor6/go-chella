import { RECEIVE_GROUP, REMOVE_GROUP } from '../actions/group_actions';
import { RECEIVE_USER_GROUPS } from '../actions/user_actions';
import merge from 'lodash/merge';
import { RECEIVE_ACT } from '../actions/act_actions';

const groupsReducer = (state={}, action) => {
  Object.freeze(state); 
  let nextState = merge({}, state);

  switch (action.type) {
    case RECEIVE_ACT:
      console.log(state);
      console.log(action.act.data);
      let currentGroup = state[action.currentGroupId];
      console.log(currentGroup);
      if (!currentGroup.actsInfo) {
        currentGroup = merge({}, currentGroup, {actsInfo: [action.act.data]});
      } else {
        currentGroup.actsInfo.push(action.act.data);
      }
      return merge({}, state, { [action.act.data._id]: action.act.data });
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