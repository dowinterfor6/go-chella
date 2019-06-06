import React from 'react';
import { withRouter } from 'react-router-dom';
import LoggedInJoin from './logged_in_join';
import AlreadyInGroup from './already_in_group';
import NotLoggedIn from './not_logged_in';
import '../../assets/stylesheets/join.css';

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      group: null
    }
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.groupId)
      .then((res) => {
        this.setState({ group: res.group.data });
      })
  }

  render() {
    if (!this.state.group) {
      return <div></div>;
    };
    let componentToRender;
    if (this.state.currentUser && this.state.group.members.includes(this.state.currentUser.id)) {
      componentToRender = <AlreadyInGroup group={this.state.group}/>
    } else {
      if (this.state.currentUser) {
        componentToRender = <LoggedInJoin group={this.state.group} />
      } else {
        componentToRender = <NotLoggedIn group={this.state.group} />
      }
    }

    return (
      <div>
        join this shit
        {componentToRender}
      </div>
    )
  }
}

export default withRouter(Join);