import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import Join from './join';
import { fetchGroup } from '../../actions/group_actions';
import { updateUser, fetchUser } from '../../util/user_api_util';
import { updateGroup } from '../../util/group_api_util';

const mapStateToProps = (state) => {
  let currentUser;
  if (state.session.isAuthenticated) {
    currentUser = state.session.user;
  };
  return {
    currentUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    openModal: (type) => dispatch(openModal(type)),
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId)),
    fetchUser: (userId) => fetchUser(userId),
    updateGroup: (group) => updateGroup(group),
    updateUser: (user) => updateUser(user)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join);