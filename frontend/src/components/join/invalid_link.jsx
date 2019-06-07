import React from 'react';
import { withRouter } from 'react-router-dom';

class InvalidLink extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavigation = this.handleNavigation.bind(this);
  }

  handleNavigation(e) {
    this.props.history.push('/');
  }

  render() {
    return(
      <div className="invalid-link-container join-sub-container">
        <h2>dis shit dont exist</h2>
        <div className="buttons">
          <button onClick={this.handleNavigation}>
            Back to dashboard
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(InvalidLink);