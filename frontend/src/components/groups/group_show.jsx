import React from 'react';
import Map from '../map/map';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/group_show.css';
import { withRouter } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.js';


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
    M.AutoInit();
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
        </div>
      );
    }

    return(
      <div className='group-show-container'> 

        <h1>{this.state.group.name}</h1>
        <div className="group-show-header">
          {owner}
          {permButtons}
        </div>

        <div className="group-show-main">
          {/* <div className="member-list">  */}
            {memberList}
          {/* </div> */}

          {/* <div className="acts-list">  */}
            {acts}
          {/* </div> */}

          {/* <div className="map-container"> */}
            <Map />
          {/* </div> */}
        </div>
        <br />
        <a
          className='invite-link-display hvr-underline-from-left'
          onClick={() => this.props.openModal('invite')}
        >
          Get invite link
          </a>

      </div>
    );
  }
};

export default withRouter(GroupShow);