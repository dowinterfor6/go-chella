import React from 'react';
import { connect } from 'react-redux';
import { fetchGroup, updateGroup } from '../../actions/group_actions';
import { fetchAct } from '../../actions/act_actions';
import { fetchUserGroups } from '../../actions/user_actions';
import { closeModal } from '../../actions/modal_actions';
import Loading from '../loading/loading';
import '../../assets/stylesheets/modal.css';
import '../../assets/stylesheets/acts_show.css'

class AddActsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.props.fetchUserGroups(this.props.currentUser.id)
            .then((res) => {
                Object.values(res.groups).map((groupId) => (
                    this.props.fetchGroup(groupId)
                        .then((res) => {
                            this.setState({ [groupId]: res.group.data })
                        })
                ))
                this.setState({ loading: false });
            });
    }

    // componentWillUnmount() {
    //     this.props.closeModal();
    // }

    // update(field) {
    //     return (e) => this.setState({
    //         [field]: field.push(this.state.act)
    //     });
    // }

    // handleSubmit(e) {
    //     e.preventDefault();
    // }

    render() {

        if (this.state.loading) {
            return <Loading />
        };

        if (this.state.groups) {
            this.state.groups.map((group_id) => {
              if (group_id !== 'loading' && group_id !=='activePanel') {
                return (
                <div className="session-form-modal">
                    <h1 className="delete-header">Add This Act</h1>

                    <h3>Choose a group to add this act to below:</h3>
                    <li 
                        key={group_id} 
                        className={`group-index-item ${group_id}`}
                        onClick={this.handleDisplay}
                    > 
                        {this.state[group_id].name}
                    </li>
                </div>
                )
              }
              return null;
            });
          } else {
              return <Loading />;
          }

    
        // return (
        //     <div className="session-form-modal">

                // <h1 className="delete-header">Add This Act</h1>

                // <h3>Choose a group to add this act to below:</h3>

        //         <select>
        //         </select>

        //         <button className="create-button">Add Act</button>
        //     </div>
        // )
    }
}

const mstp = state => {
    return {
        act: state.act,
        currentUser: state.session.user
    };
};

const mdtp = dispatch => {
    return {
        fetchAct: id => dispatch(fetchAct(id)),
        upateGroup: group => dispatch(updateGroup(group)),
        fetchUserGroups: userId => dispatch(fetchUserGroups(userId)),
        fetchGroup: groupId => dispatch(fetchGroup(groupId)),
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(
    mstp,
    mdtp
)(AddActsForm);