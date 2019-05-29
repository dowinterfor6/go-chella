import axios from 'axios';

export const fetchAct = (groupId) => {
  return axios.get(`/api/acts/${groupId}`);
}

export const fetchActs = () => {
  return axios.get('/api/acts');
};