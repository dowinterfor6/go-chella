import { connect } from 'react-redux';
import InviteLink from './invite_link';
import { closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
  let currentGroupId = Object.keys(state.groups)[0];
  return {
    group: state.groups[currentGroupId]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteLink);