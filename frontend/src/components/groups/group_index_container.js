import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import GroupIndex from './group_index';
import { fetchUserGroups } from '../../actions/user_actions';
import { fetchGroup } from '../../actions/group_actions';
import { fetchUser } from '../../util/user_api_util';
import { fetchAct } from '../../util/acts_api_util';

const mapStateToProps = (state) => {
  return {
    posts: Object.keys(state.groups).map(id => state.groups[id]),
    currentUser: state.session.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchUserGroups: (userId) => dispatch(fetchUserGroups(userId)),
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
    fetchUser: (userId) => fetchUser(userId),
    fetchAct: (actId) => fetchAct(actId)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupIndex);