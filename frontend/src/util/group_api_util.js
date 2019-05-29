import axios from 'axios';

export const fetchGroup = (groupId) => {
  return axios.get(`/api/groups/${groupId}`)
};

export const createGroup = (group) => {
  return axios.post('/api/groups', group)
}

export const updateGroup = (group) => {
  return axios.put(`/api/groups/${group.id}`, group)
}

export const deleteGroup = (id) => {
  return axios.delete(`/api/groups/${id}`)
}

