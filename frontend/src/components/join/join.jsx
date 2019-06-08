import React from 'react';
import { withRouter } from 'react-router-dom';
import LoggedInJoin from './logged_in_join';
import AlreadyInGroup from './already_in_group';
import NotLoggedIn from './not_logged_in';
import '../../assets/stylesheets/join.css';
import InvalidLink from './invalid_link';

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      group: -1
    }
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId)
      .then((res) => {
        this.setState({ group: res.group.data });
        this.props.fetchUser(this.props.currentUser.id)
          .then((res) => {
            this.setState({ currentUser: res.data })
          });
      })
      .catch((res) => {
        this.setState({ group: null });
      })
      .finally(() => {
        let ul = document.getElementsByTagName('ul')[0];
        ul.setAttribute('style', 'display: none');
        let nav = document.getElementsByClassName('nav-logo-before-login')[0];
        if (nav) {
          nav.setAttribute('style', 'position: inherit');
        };
      })
  }

  componentWillUnmount() {
    let ul = document.getElementsByTagName('ul')[0];
    ul.removeAttribute('style');
    let nav = document.getElementsByClassName('nav-logo-before-login')[0];
    if (nav) {
      nav.removeAttribute('style');
    };
  }

  render() {
    if (this.state.group === -1) {
      return <div></div>;
    };
    let componentToRender;
    if (!this.state.group) {
      componentToRender = <InvalidLink />
    } else if (this.state.currentUser && this.state.group.members.includes(this.state.currentUser.id)) {
      componentToRender = <AlreadyInGroup group={this.state.group}/>
    } else {
      if (this.state.currentUser) {
        componentToRender = <LoggedInJoin 
          group={this.state.group} 
          currentUser={this.state.currentUser}
          updateUser={this.props.updateUser}
          updateGroup={this.props.updateGroup}
          />
      } else {
        componentToRender = <NotLoggedIn group={this.state.group} />
      }
    }

    return (
      <div className="main-join-container">
        <h1>Join a group via invite url!</h1>
        {componentToRender}
      </div>
    )
  }
}

export default withRouter(Join);