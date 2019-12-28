import axios from 'axios';

export const fetchUsersGroups = (userId) => {
  return axios.get(`api/users/${userId}/groups`)
};

export const fetchAllUsers = () => {
  return axios.get('api/users');
};

export const fetchUser = (userId) => {
  return axios.get(`api/users/${userId}`)
}

export const updateUser = (user) => {
  return axios.put(`/api/users/${user.id}`, user)
}
