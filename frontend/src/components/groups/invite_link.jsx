import React from 'react';
import { withRouter } from 'react-router-dom';

const handleCopy = (e) => {
  let text = document.getElementsByClassName('link-display')[0];
  text.select();
  document.execCommand("copy");
}

const InviteLink = (props) => {
  let groupId = props.location.pathname.split('/')[2];
  let groupNameParse = props.group.name.toLowerCase();
  groupNameParse = groupNameParse.match(/[a-zA-Z]+/g).join('_');
  let inviteLink = 'https://brochella.herokuapp.com/invite/' + groupNameParse + '/' + groupId;

  return (
    <div className="delete-form-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="delete-header">Invite link</h1>
      <p className="create-message">Share this link with your friends to join the group!</p>
      <input type="text"
        className="link-display" 
        readOnly
        value={inviteLink}  
      />
      <button className="create-button" onClick={handleCopy}>
        Copy
      </button>
    </div>
  )
}

export default withRouter(InviteLink);