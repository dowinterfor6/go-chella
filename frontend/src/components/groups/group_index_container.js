import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import GroupIndex from './group_index';
import { fetchGroup } from '../../actions/group_actions';

import { fetchUser, fetchUsersGroups } from '../../util/user_api_util';
import { fetchAct } from '../../actions/act_actions';
// import { fetchAct } from '../../util/acts_api_util';

const mapStateToProps = (state) => {
  return {
    posts: Object.keys(state.groups).map(id => state.groups[id]),
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
    fetchUserGroups: (userId) => fetchUsersGroups(userId),
    fetchAct: (actId, currentGroupId) => dispatch(fetchAct(actId, currentGroupId)),

    fetchUser: (userId) => fetchUser(userId),
    // fetchAct: (actId) => fetchAct(actId)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupIndex);