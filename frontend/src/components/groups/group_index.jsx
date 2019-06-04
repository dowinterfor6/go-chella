import React from 'react';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/group_index.css';
import Loading from '../loading/loading';
import GroupIndexDisplayContainer from './group_index_display_container';

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
    // SET FRONTEND STATE
    document.title = 'Dashboard';

    // Old Code
    // this.props.fetchUserGroups(this.props.currentUser.id)
    //   .then(
    //     (res) => {
    //       Object.values(res.groups).map((groupId) => (
    //         this.props.fetchGroup(groupId).then(
    //           (res) => {
    //             this.setState({ [groupId]: res.group.data })
    //           }
    //         )
    //       ));
    //       // Emulate long loading screen
    //       // window.setTimeout(() => (this.setState({ loading: false })), 10000); 
    //       this.setState({ loading: false });
    //     }
    //   )

    // New Code
    // Need API for fetch user
    let getUserGroups = this.props.fetchUserGroups(this.props.currentUser.id);
    getUserGroups.then((userGroups) => {
      let promiseArr = [];
      let promise;
      let groups = {};
      userGroups.groups.forEach((id) => {
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
            let ownerPromise = (ownerId, currentGroupId) => this.props.fetchUser(ownerId).then((res) => {
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
                let memberPromise = (memberId, currentGroup) => this.props.fetchUser(memberId).then((res) => {
                  return {
                    data: res.data,
                    group: currentGroup
                  };
                });
                let memberResult = await memberPromise(memberId, currentGroup);
                memberResult.group.members.push(memberResult.data);
              }
            );

            // Acts
            acts = currentGroup.acts;
            currentGroup.acts = [];
            acts.forEach(
              async (actId) => {
                let actPromise = (actId, currentGroup) => this.props.fetchAct(actId).then((res) => {
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
        console.log(groups);
        // Groups contain acts[ids], members[ids], ownerId
        // console.log(groups);
      });
    });
  }

  handleDisplay(e) {
    let clickedGroupId = e.currentTarget.classList[1];
    if (this.state.activePanel !== clickedGroupId) {
      this.setState({ activePanel: clickedGroupId });
    };
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    };
    let groups = [];

    // TODO: Temporary
    // if (Object.values(this.state).length > 2) {
    //   groups = Object.keys(this.state).map((group_id) => {
    //     if (group_id !== 'loading' && group_id !=='activePanel') {
    //       return (
    //         <li 
    //           key={group_id} 
    //           className={`group-index-item ${group_id}`}
    //           onClick={this.handleDisplay}
    //         > 
    //           {this.state[group_id].name}
    //         </li>
    //       )
    //     }
    //     return undefined;
    //   });
    // } 

    return (
      <div className='group-index-container'>
        <GroupIndexDisplayContainer activeGroup={this.state[this.state.activePanel]}/>
        <ul className='group-index-viewer'> 
          { groups.reverse() }
        </ul>
      </div>
    )
  }
}

export default GroupIndex;