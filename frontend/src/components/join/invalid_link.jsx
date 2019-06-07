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
      <div className="invalid-link-container">
        <div>dis shit dont exist</div>
        <button onClick={this.handleNavigation}>
          Back to dashboard
        </button>
      </div>
    )
  }
}

export default withRouter(InvalidLink);