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
      activePanel: null,
      numObjToLoad: -Infinity,
      objLoaded: -1
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

      // If there are no groups
      if (promiseArr.length === 0) {
        this.setState({ numObjToLoad: 1, objLoaded: 1, loading: false });
      }

      Promise.all(promiseArr).then((res) => {
        let objToLoad = 0;
        Object.keys(this.props.groups).forEach((groupId) => {
          // Add owner
          objToLoad++;
          // Add acts
          objToLoad += this.props.groups[groupId].acts.length;
          // Add members
          objToLoad += this.props.groups[groupId].members.length;
        });
        this.setState({ numObjToLoad: objToLoad, objLoaded: 0 });

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
                let actPromise = (actId, currentGroupId) => this.props.fetchAct(actId, currentGroupId).then((res) => {
                  return {
                    data: res.data,
                    group: currentGroup
                  };
                });
                let actResult = await actPromise(actId, currentGroup.id);
                actResult.group.acts.push(actResult.data);
              }
            );

            let ownerResult = await ownerPromise(currentGroup.owner, currentGroup.id);
            groups[ownerResult.id].owner = ownerResult.data;
          }
        );
        // this.setState({groups: groups, loading: false})
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.objLoaded >= 0) {
      this.setState({ objLoaded: this.state.objLoaded + 1 })
    }
    if (Object.keys(nextProps.groups).every((key) => (
      typeof nextProps.groups[key].owner === 'object' &&
      (nextProps.groups[key].actsInfo && 
      Object.keys(nextProps.groups[key].actsInfo).length 
        === nextProps.groups[key].acts.length) &&
      (nextProps.groups[key].memberInfo &&
      Object.keys(nextProps.groups[key].memberInfo).length
      === nextProps.groups[key].members.length)
    ))) {
      this.setState({ groups: nextProps.groups, loading: false })
    };
  }

  handleDisplay(e) {
    let clickedGroupId = e.currentTarget.classList[1];
    if (this.state.activePanel !== clickedGroupId) {
      this.setState({ activePanel: this.state.groups[clickedGroupId] });
    };
  }

  render() {
    let percent = 100 * this.state.objLoaded / this.state.numObjToLoad;
    if (this.state.loading) {
      return <Loading percent={percent}/>
    };

    let groups = [];
    groups = Object.keys(this.state.groups).reverse().map((groupId) => {
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
      acts={this.state.activePanel.actsInfo}
      />
    } else {
      display = <GroupIndexDisplay
        activeGroup={this.state.activePanel}
      />
    };

    return (
      <section className="main-index-content">
        <h1>Organize your group for Coachella!</h1>
        <div className='group-index-container'>
          { display }
          <ul className='group-index-viewer'> 
            { groups }
          </ul>
        </div>
      </section>
    )
  }
}
export default GroupIndex;