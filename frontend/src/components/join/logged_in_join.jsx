import React from 'react';
import { withRouter } from 'react-router-dom';


class LoggedInJoin extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavigation = this.handleNavigation.bind(this);
  }
  
  handleNavigation(e) {
    let buttonText = e.currentTarget.innerHTML;
    if (buttonText === 'Count me in!') {
      // Add user to group
      this.props.history.push(`/groups/${this.props.group.id}`);
    } else if (buttonText === 'No thanks') {
      this.props.history.push('/');
    }
  }

  render() {
    let groupName = this.props.group.name;

    return (
      <div className="logged-in-join-container">
        <h1>Are you sure you want to join "{groupName}"?</h1>
        <button onClick={this.handleNavigation}>
          Count me in!
        </button>
        <button onClick={this.handleNavigation}>
          No thanks
        </button>
      </div>
    )
  }
}

export default withRouter(LoggedInJoin);