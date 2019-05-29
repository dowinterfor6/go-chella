import { connect } from 'react-redux';
import InviteLink from './invite_link';
import { closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
  return {
    group: state.groups.data
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteLink);