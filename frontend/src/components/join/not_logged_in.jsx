import React from 'react';
import { withRouter } from 'react-router-dom';

class NotLoggedIn extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavigation = this.handleNavigation.bind(this);
  }

  handleNavigation(e) {
    let buttonText = e.currentTarget.innerHTML;
    if (buttonText === "Sign up and join group!") {
      // Open modal
      console.log('hell yeah');
    } else if (buttonText === "Maybe some other time") {
      this.props.history.push('/');
    }
  }

  render() {

    return (
      <div className="not-logged-in-container join-sub-container">
        <h2>
          You need an account to join this group... Would you like to make one and join "{this.props.group.name}"?
        </h2>
        <div className="buttons">
          <button onClick={this.handleNavigation}>
            Sign up and join group!
          </button>
          <button onClick={this.handleNavigation}>
            Maybe some other time
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(NotLoggedIn);