import { connect } from 'react-redux';
import { signup, deleteErrors } from '../../actions/session_actions';
import SignupForm from './signup_form';
import { closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (user) => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal()),
    deleteErrors: () => dispatch(deleteErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);