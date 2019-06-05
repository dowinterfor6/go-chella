import React from 'react';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/group_index.css';
import Loading from '../loading/loading';
import GroupIndexDisplay from './group_index_display';

class GroupIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      groups: {},
      loading: true,
      activePanel: null
    };

    this.handleDisplay = this.handleDisplay.bind(this);
  }

  componentDidMount() {
    document.title = 'Dashboard';

    let getUserGroups = this.props.fetchUserGroups(this.props.currentUser.id);
    getUserGroups.then((userGroups) => {
      let promiseArr = [];
      let promise;
      let groups = {};
      userGroups.data.groups.forEach((id) => {
        promise = this.props.fetchGroup(id);
        promiseArr.push(promise);
      });
      Promise.all(promiseArr).then((res) => {
        let currentGroup;
        let members;
        let acts;

        res.forEach(
          async (resolve) => {
            currentGroup = resolve.group.data;
            groups[currentGroup.id] = currentGroup;

            // Owner
            let ownerPromise = (ownerId, currentGroupId) => this.props.fetchOwner(ownerId, currentGroupId).then((res) => {
              return {
                data: res.data,
                id: currentGroupId
              };
            });

            // Members
            members = currentGroup.members;
            currentGroup.members = [];
            members.forEach(
              async (memberId) => {
                let memberPromise = (memberId, currentGroupId) => this.props.fetchUser(memberId, currentGroupId).then((res) => {
                  return {
                    data: res.data,
                    group: currentGroup
                  };
                });
                let memberResult = await memberPromise(memberId, currentGroup.id);
                memberResult.group.members.push(memberResult.data);
              }
            );

            // Acts
            acts = currentGroup.acts;
            currentGroup.acts = [];
            acts.forEach(
              async (actId) => {
                let actPromise = (actId, currentGroup) => this.props.fetchAct(actId, currentGroup.id).then((res) => {
                  return {
                    data: res.data,
                    group: currentGroup
                  };
                });
                let actResult = await actPromise(actId, currentGroup);
                actResult.group.acts.push(actResult.data);
              }
            );

            let ownerResult = await ownerPromise(currentGroup.owner, currentGroup.id);
            groups[ownerResult.id].owner = ownerResult.data;
          }
        );
        this.setState({groups: groups, loading: false})
      });
    });
  }

  handleDisplay(e) {
    let clickedGroupId = e.currentTarget.classList[1];
    if (this.state.activePanel !== clickedGroupId) {
      this.setState({ activePanel: this.state.groups[clickedGroupId] });
    };
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    };

    let groups = [];
    groups = Object.keys(this.state.groups).map((groupId) => {
      return (
        <li
          key={groupId}
          className={`group-index-item ${groupId}`}
          onClick={this.handleDisplay}
        >
          {this.state.groups[groupId].name}
        </li>
      )
    });

    let display;
    if (this.state.activePanel) {
      display = <GroupIndexDisplay
      activeGroup={this.state.activePanel}
      acts={this.state.activePanel.acts}
      />
    } else {
      display = <GroupIndexDisplay
        activeGroup={this.state.activePanel}
      />
    };

    return (
      <div className='group-index-container'>
        { display }
        <ul className='group-index-viewer'> 
          { groups }
        </ul>
      </div>
    )
  }
}

export default GroupIndex;