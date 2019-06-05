import React from 'react';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/navbar.css';
import ModalContainer from '../modal/modal_container';
import { withRouter } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.getLinks = this.getLinks.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
  }

  handleNavigation(e) {
    let path = '/' + e.currentTarget.innerHTML.toLowerCase();
    if (this.props.location.pathname !== path) {
      this.props.history.push(path);
    };
  }

  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="nav-logo-after-login">
          <h1><img src="https://fontmeme.com/permalink/190605/2ddc6672710ed3d9c8ab1e12df94955c.png" alt="" /></h1>
          <ul className='nav-bar-items-after-login'>
            <li className='hvr-underline-from-center' >
              <a onClick={this.handleNavigation}>Dashboard</a>
            </li>
            <li className='hvr-underline-from-center' >
              <a onClick={this.handleNavigation}>Discover</a>
            </li>
            <li className='hvr-underline-from-center' >
              <a onClick={this.handleNavigation}>Profile</a>
            </li>
            <li className='hvr-underline-from-center' >
              <a onClick={() => this.props.openModal('logout')}>Logout</a>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="nav-logo-before-login">
          <h1><img src="https://fontmeme.com/permalink/190605/2ddc6672710ed3d9c8ab1e12df94955c.png" alt="" /></h1>
          <ul className='nav-bar-items-before-login'>
            <li className='hvr-underline-from-center' >
              <a
                onClick={() => this.props.openModal('signup')}
              >
                Signup
              </a>
            </li>
            <li className='hvr-underline-from-center' >
              <a
                onClick={() => this.props.openModal('login')}
              >
              Login
              </a>
            </li>
          </ul>
        </div>
      );
    }
  }

  render() {
    return (
      <nav className="nav-bar-container">
        { this.getLinks() }
        <ModalContainer />
      </nav>
    )
  }
}

export default withRouter(NavBar);