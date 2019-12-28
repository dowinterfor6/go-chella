import { connect } from 'react-redux';
import { signup, deleteErrors } from '../../actions/session_actions';
import SignupForm from './signup_form';
import { closeModal } from '../../actions/modal_actions';
import { updateUser, fetchUser } from '../../util/user_api_util';
import { updateGroup } from '../../util/group_api_util';

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session,
    session: state.session,
    groups: state.groups
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal()),
    deleteErrors: () => dispatch(deleteErrors()),
    updateGroup: (group) => updateGroup(group),
    updateUser: (user) => updateUser(user),
    fetchUser: (userId) => fetchUser(userId)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);