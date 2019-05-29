import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal_actions';
import { deleteGroup } from '../../../actions/group_actions';
import '../../../assets/stylesheets/modal.css';

function DeleteForm(props) {

    const { deleteGroup, group } = props;
    
    return (
      <div className="delete-form-modal"
        onClick={(e) => e.stopPropagation() }
        >
        <h1 className="delete-header">Warning!</h1>
        <p className="delete-message">Once you click 'Delete', this action cannot be undone!</p>
        <button 
          className="delete-button"
          onClick={
            (e) => {
              deleteGroup(group.id);
              props.closeModal();
              props.history.push('/dashboard');
            }
          }
        >
        Confirm & Delete
        </button>
      </div>
    );

}


const mstp = state => {
    return {
        group: state.groups.data
    };
};

const mdtp = dispatch => {
  return {
    deleteGroup: group => dispatch(deleteGroup(group)),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mstp, mdtp)(withRouter(DeleteForm));