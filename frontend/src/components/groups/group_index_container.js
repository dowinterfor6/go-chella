import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import GroupIndex from './group_index';
import { fetchGroup } from '../../actions/group_actions';

import { fetchUsersGroups } from '../../util/user_api_util';
import { fetchAct } from '../../actions/act_actions';
import { fetchUser, fetchOwner } from '../../actions/user_actions';

const mapStateToProps = (state) => {
  return {
    groups: state.groups,
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
    fetchUserGroups: (userId) => fetchUsersGroups(userId),
    fetchAct: (actId, currentGroupId) => dispatch(fetchAct(actId, currentGroupId)),
    fetchUser: (userId, currentGroupId) => dispatch(fetchUser(userId, currentGroupId)),
    fetchOwner: (userId, currentGroupId) => dispatch(fetchOwner(userId, currentGroupId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupIndex);