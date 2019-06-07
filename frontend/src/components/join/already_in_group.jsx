import React from 'react';
import { withRouter } from 'react-router-dom';

class AlreadyInGroup extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavigation = this.handleNavigation.bind(this);
  }

  handleNavigation(e) {
    let buttonText = e.currentTarget.innerHTML;
    if (buttonText === "Are you sure? Take me to the group!") {
      this.props.history.push(`/groups/${this.props.group.id}`);
    } else if (buttonText === "Back to dashboard") {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="already-in-group-container join-sub-container">
        <h2>Something went wrong... it looks like you're already in "{this.props.group.name}"!</h2>
        <div className="buttons">
          <button onClick={this.handleNavigation}>
            Are you sure? Take me to the group!
          </button>
          <button onClick={this.handleNavigation}>
            Back to dashboard
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(AlreadyInGroup);