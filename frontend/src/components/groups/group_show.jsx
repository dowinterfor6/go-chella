import React from 'react';
import Map from '../map/map';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/group_show.css';
import { withRouter } from 'react-router-dom';

class GroupShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      group: {}
    };
  }

  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.id)
      .then((res) => { 
        this.setState({ group: res.group.data })
      })
      .then(() => this.props.fetchAllUsers())
      .then((res) => {
        res.users.data.map((user) => (
          this.setState({ [user._id]: user })
        ))
      })
      .then(() => {
        this.props.fetchActs().then(
          (res) => {
            res.acts.map((act) => (
              this.setState({ [act._id]: act })
            ))
          }
        )
      })
      .then(() => {
        this.props.fetchOneUser(this.props.currentUser.id)
          .then((res) => this.setState({ user: res.user.data }))
      });
  }

  leaveGroup(e) {
    e.preventDefault();
    // Create a new Group Object to pass to updateGroup
    let newGroup = Object.assign({}, this.state.group);
    let newMembers = this.state.group.members.filter((member) => member !== this.props.currentUser.id);
    newGroup.members = newMembers;


    if(newMembers.length === 0) {
      this.props.updateGroup(newGroup);
      this.props.deleteGroup(newGroup.id);
    } else {
      this.props.updateGroup(newGroup);
    }

    // Create a new User Object to pass to updateUser
    let newUser = Object.assign({}, this.state.user);
    let newGroups = this.state.user.groups.filter((group) => group !== this.state.group.id);
    newUser.groups = newGroups;

    // Update both the group and the user, and then redirect to the dashboard
    this.props.updateUser(newUser)
      .then(this.props.history.push('/discover'));
  }

  render() {
    let groupName = this.state.group.name;
    if (groupName && document.title !== groupName) {
      document.title = `${groupName}`;
    }
    let memberList;
    let owner;
    let acts;
    let permButtons;
  

    if (this.state.group.members) {
      memberList = (
        <div className="group-member-list-container">
          <h2>Member List:</h2>
          <ul className="group-member-list">
            {this.state.group.members.map((key, idx) => {
              if(this.state[key]) {
                return (
                  <li key={idx}>
                    <p>
                      {this.state[key].username}
                    </p>
                  </li>
                )
              }
              return null;
            })}
          </ul>
        </div>
      );
    }
    if (this.state.group.owner) {
      let ownerUser = this.state[this.state.group.owner];
      if (ownerUser) {
        owner = (
          <div className="owner-display">
            <h2>Created by: {ownerUser.username}</h2>
          </div>
        )
      };
    }
    if (this.state.group.acts && this.state.group.acts.length > 0) {
      acts = (
        <div className="group-acts-container">
          <h2>Acts List:</h2>
          <ul className="group-acts-list">
            {this.state.group.acts.map((act, idx) => {
              if(this.state[act]) {
                return (
                  <li key={idx}>
                    <p>
                      {this.state[act].name}
                    </p>
                  </li>
                )
              }
              return null;
            })}
          </ul>
        </div>
      )
    }
    if (this.props.currentUser.id === this.state.group.owner) {
      permButtons = (
        <div className="group-show-nav-container">
          <button onClick={() => this.props.openModal('Edit Group')}>
            Edit Group
            </button>

          <button onClick={() => this.props.openModal('Delete Confirmation')}>
            Delete Group
            </button>

          <button onClick={(e) => this.leaveGroup(e)}>
            Leave Group
          </button>
        </div>
      );
    }

    return(
      <div className='group-show-container'> 
        <div className="group-show-main">
          <div className="group-show-header">
            <h1>{this.state.group.name}</h1>
            <br />
            <a 
              className='invite-link-display hvr-underline-from-left'
              onClick={() => this.props.openModal('invite')}
            >
              Get invite link
            </a>
            <br/>
          {permButtons}
          </div>
          {owner}
          {memberList}
          {acts}
        </div>

        <aside className="map-container">
          <Map />
        </aside>
      </div>
    );
  }
};

export default withRouter(GroupShow);