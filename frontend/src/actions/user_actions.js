import * as userApiUtil from '../util/user_api_util';

export const RECEIVE_USER_GROUPS = 'RECEIVE_USER_GROUPS';
export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_OWNER = 'RECEIVE_OWNER';
export const RECEIVE_ONE_USER = 'RECEIVE_ONE_USER';

const receiveOneUser = user => {
  return {
    type: RECEIVE_ONE_USER,
    user
  };
};

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

const receiveUser = (user, currentGroupId) => {
  return {
    type: RECEIVE_USER,
    user,
    currentGroupId
  }
}

const receiveOwner = (user, currentGroupId) => {
  return {
    type: RECEIVE_OWNER,
    user,
    currentGroupId
  }
}

export const fetchOneUser = userId => dispatch => (
  userApiUtil.fetchUser(userId)
    .then((user) => dispatch(receiveOneUser(user)))
);

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

export const fetchUser = (userId, currentGroupId) => (dispatch) => (
  userApiUtil.fetchUser(userId)
    .then(
      (rawData) => dispatch(receiveUser(rawData.data, currentGroupId))
    )
)

export const fetchOwner = (userId, currentGroupId) => (dispatch) => (
  userApiUtil.fetchUser(userId)
    .then(
      (rawData) => dispatch(receiveOwner(rawData.data, currentGroupId))
    )
)