import { connect } from 'react-redux';
import { login, deleteErrors } from '../../actions/session_actions';
import LoginForm from './login_form';
import { closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    closeModal: () => dispatch(closeModal()),
    deleteErrors: () => dispatch(deleteErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);