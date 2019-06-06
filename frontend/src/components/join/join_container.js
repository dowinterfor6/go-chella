import { connect } from 'react-redux';
import { closeModal, openModal } from '../../actions/modal_actions';
import Join from './join';
import { fetchGroup } from '../../actions/group_actions';

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
    fetchGroup: (groupId) => dispatch(fetchGroup(groupId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join);