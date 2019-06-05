import * as actsApiUtil from '../util/acts_api_util';

export const RECEIVE_ACT = 'RECEIVE_ACT';
// TODO: Check if other act actions are being used anywhere
export const REMOVE_ACTS = 'REMOVE_ACTS';
export const RECEIVE_ACTS = 'RECEIVE_ACTS';

const receiveAct = (act, currentGroupId) => ({
  type: RECEIVE_ACT,
  act,
  currentGroupId
});

const removeActs = () => ({
  type: REMOVE_ACTS
})

const receiveActs = (acts) => ({
  type: RECEIVE_ACTS,
  acts: acts.data
})

export const fetchAct = (actId, currentGroupId) => (dispatch) => (
  actsApiUtil.fetchAct(actId).then((act) => dispatch(receiveAct(act, currentGroupId)))
);

export const deleteActs = (actId = '') => (dispatch) => (
  actsApiUtil.fetchAct(actId).then(() => dispatch(removeActs()))
);

export const fetchActs = () => (dispatch) => (
  actsApiUtil.fetchActs().then((acts) => dispatch(receiveActs(acts)))
);