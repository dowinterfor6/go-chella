import React from 'react';

const LogoutConfirmation = (props) => (
  <div className="delete-form-modal"
    onClick={(e) => e.stopPropagation()}
  >
    <h1 className="delete-header">Hold up!</h1>
    <p className="delete-message">Are you sure you want to log out?</p>
    <button
      className="delete-button"
      onClick={
        () => {
          props.closeModal();
          props.logout();
        }
      }
    >
      Logout
    </button>
  </div>
)

export default LogoutConfirmation;