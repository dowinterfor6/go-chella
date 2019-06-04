import React from 'react';
import { connect } from 'react-redux';
import { fetchGroup, updateGroup } from '../../actions/group_actions';
import { fetchAct } from '../../actions/act_actions';
import { fetchUserGroups } from '../../actions/user_actions';
import { closeModal } from '../../actions/modal_actions';
import '../../assets/stylesheets/modal.css';
import '../../assets/stylesheets/acts_show.css'

class AddActsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
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
            });
        // this.setState({ act: this.props.act });
    }

    componentWillUnmount() {
        this.props.closeModal();
    }

    updateActs() {
        return (e) => this.setState({

        });
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {

        if(!this.state.groups) {
            return null;
        }

        let groups = this.state.groups.map((groupId) => {
            return this.state[groupId].name;
        });
    
        return (
            <div className="add-act-modal">

                <h1 className="delete-header">Add This Act</h1>

                <h3>Choose a group to add this act to below:</h3>

                <li>{groups}</li>
                {/* <select>
                </select> */}

            </div>
        )
    }
}

const mstp = (state, ownProps) => {
    return {
        act: state.act,
        currentUser: state.session.user,
        formType: 'Add Act'
    };
};

const mdtp = (dispatch) => {
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