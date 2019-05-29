import React from 'react';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/group_index.css';
import Loading from '../loading/loading';
import GroupIndexDisplayContainer from './group_index_display_container';

class GroupIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activePanel: null
    };

    this.handleDisplay = this.handleDisplay.bind(this);
  }

  componentDidMount() {
    document.title = 'Dashboard';
    this.props.fetchUserGroups(this.props.currentUser.id)
      .then(
        (res) => {
          Object.values(res.groups).map((groupId) => (
            this.props.fetchGroup(groupId).then(
              (res) => {
                this.setState({ [groupId]: res.group.data })
              }
            )
          ));
          // Emulate long loading screen
          // window.setTimeout(() => (this.setState({ loading: false })), 10000); 
          this.setState({ loading: false });
        }
      )
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
    if (Object.values(this.state).length > 2) {
      groups = Object.keys(this.state).map((group_id) => {
        if (group_id !== 'loading' && group_id !=='activePanel') {
          return (
            <li 
              key={group_id} 
              className={`group-index-item ${group_id}`}
              onClick={this.handleDisplay}
            > 
              {this.state[group_id].name}
            </li>
          )
        }
        return undefined;
      });
    } 

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