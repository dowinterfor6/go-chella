import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

import { closeModal } from '../../actions/modal_actions';
import LogoutConfirmation from './logout_confirmation';

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(LogoutConfirmation);