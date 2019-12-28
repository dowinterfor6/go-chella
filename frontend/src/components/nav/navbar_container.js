import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';

import NavBar from './navbar';
import { openModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.session.isAuthenticated
  } 
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    openModal: (modal) => dispatch(openModal(modal))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);