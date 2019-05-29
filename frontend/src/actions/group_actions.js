import * as GroupAPIUtil from '../util/group_api_util';

export const RECEIVE_GROUP = 'RECEIVE_GROUP';
export const REMOVE_GROUP = 'REMOVE_GROUP';

const receiveGroup = (group) => ({
  type: RECEIVE_GROUP,
  group
});

const removeGroup = (groupId) => ({
  type: REMOVE_GROUP, 
  groupId
});

export const fetchGroup = (id) => (dispatch) => (
  GroupAPIUtil.fetchGroup(id).then(group => dispatch(receiveGroup(group)))
);

export const createGroup = (group) => (dispatch) => (
  GroupAPIUtil.createGroup(group).then(group => dispatch(receiveGroup(group)))
);

export const updateGroup = (group) => (dispatch) => (
  GroupAPIUtil.updateGroup(group).then(group => dispatch(receiveGroup(group)))
);

export const deleteGroup = (groupId) => (dispatch) => (
  GroupAPIUtil.deleteGroup(groupId).then(group => dispatch(removeGroup(group.id)))
);
