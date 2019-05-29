import * as userApiUtil from '../util/user_api_util';

export const RECEIVE_USER_GROUPS = 'RECEIVE_USER_GROUPS';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';

const receiveUserGroups = (groups) => {
  return {
    type: RECEIVE_USER_GROUPS,
    groups
  };
};

const receiveAllUsers = users => {
  return {
    type: RECEIVE_ALL_USERS,
    users
  }
}

export const fetchAllUsers = ()=> dispatch => (
  userApiUtil.fetchAllUsers()
    .then((users) => dispatch(receiveAllUsers(users)))
);

export const fetchUserGroups = (userId) => (dispatch) => (
  userApiUtil.fetchUsersGroups(userId)
    .then(
      (rawData) => dispatch(receiveUserGroups(rawData.data.groups))
    )
);