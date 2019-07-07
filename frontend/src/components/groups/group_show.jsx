import React from 'react';
import Map from '../map/map';
import { Link } from 'react-router-dom';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/group_show.css';
import '../../assets/stylesheets/main_page.css';
import { withRouter } from 'react-router-dom';

class GroupShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      group: {},
      errors: []
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

  parseDate(date) {
    let newDate;
    let newTime;
    let dateArr = date.split('T');
    newDate = dateArr[0];
    let timeArr = dateArr[1].split('Z');
    newTime = timeArr[0].split('.')[0];
    return { date: newDate, time: newTime }
  }

  removeAct(id) {
    if(this.state.group.acts.length === 1) {
      alert('Sorry, must have at least one act');
    } else {
      let newGroup = Object.assign({}, this.state.group);
      let newActs = newGroup.acts.filter((act) => act !== id);
      newGroup.acts = newActs;
      this.props.updateGroup(newGroup)
        .then(this.setState({ group: newGroup }));
    }
  }

  leaveGroup(e) {
    e.preventDefault();
    // Create a new Group Object to pass to updateGroup
    let newGroup = Object.assign({}, this.state.group);
    let newMembers = this.state.group.members.filter((member) => member !== this.props.currentUser.id);
    newGroup.members = newMembers;


    // If this was the last member, then delete the group entirely
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

    // Update the user and then redirect to the dashboard
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
          <h2 style={{fontSize: "48px", textDecoration: "underline"}}>Your Crew:</h2>
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
            <h2>Group Host: {ownerUser.username}</h2>
          </div>
        )
      };
    }
    if (this.state.group.acts && this.state.group.acts.length > 0) {
      acts = (
        <div className="group-acts-container">
          <h2 style={{fontSize: "48px", textDecoration: "underline"}}>Who You're Seeing:</h2>
          <ul className="group-acts-list">
            {this.state.group.acts.map((act, idx) => {
              if(this.state[act]) {
                return (
                  <li key={idx}>
                    <p>
                      <strong><Link style={{textDecoration: "underline"}} to={`/acts/${act}`}>{this.state[act].name}:</Link></strong> on &nbsp;
                      {this.parseDate(this.state[act].date).date.split('-')[1] + '/' + this.parseDate(this.state[act].date).date.split('-')[2]}
                      &nbsp; at {this.parseDate(this.state[act].date).time}
                      &nbsp; on the {this.state[act].stage}. 
                      &nbsp; <button className="remove-act" onClick={() => this.removeAct(act)}>Remove Act</button>
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
        </div>
      );
    } else {
      permButtons = (
        <button onClick={this.leaveGroup}>
          Leave Group
        </button>
      );
    }

    return(
      <div>
        <div className='group-show-container'> 
          <div className="group-show-background"></div>
          <h1 style={{ fontSize: "56px" }}>{this.state.group.name}</h1>
          <div className="group-show-header">
            {owner}
            <a
              className='invite-link-display hvr-underline-from-left'
              onClick={() => this.props.openModal('invite')}
            >
              Get invite link
            </a>
            {permButtons}
          </div>

          <div className="group-show-main">
              {acts}
              {memberList}
              <Map />
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(GroupShow);