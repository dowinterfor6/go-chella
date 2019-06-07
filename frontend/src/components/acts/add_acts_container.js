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
            act: this.props.act,
            loading: true,
            group: ''
        }
        this.updateGroupActs = this.updateGroupActs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            this.setState({ loading: false });
    }

    updateGroupActs() {
        return (e) => this.setState({
            group: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let daGroup = this.state[this.state.group];
        daGroup.acts.push(this.props.act.id);
        this.props.updateGroup(daGroup).then(this.props.closeModal);
    }

    render() {

        if (this.state.loading) {
            return <Loading />
        };
        console.log(this.state[this.state.group]);
        console.log(this.state.act)

        let groups = (
            Object.keys(this.state).slice(2, Object.keys(this.state).length).sort().map((key, idx) => (
                <option key={idx} value={key}>{this.state[key].name}</option>
            ))
          )

        return (
            <div className="delete-form-modal"
                onClick={(e) => e.stopPropagation() }>
                <h1 className="delete-header">Add This Act</h1>

                <h3>Choose a group to add this act to below:</h3>

                <select onChange={this.updateGroupActs()} value={this.state.group}>
                    {groups}
                </select>
                <button onClick={this.handleSubmit}>Add Act</button>
            </div>
        );
    }
}

const mstp = (state, ownProps) => {
    return {
        act: state.acts,
        currentUser: state.session.user
    };
};

const mdtp = dispatch => {
    return {
        fetchAct: id => dispatch(fetchAct(id)),
        updateGroup: group => dispatch(updateGroup(group)),
        fetchUserGroups: userId => dispatch(fetchUserGroups(userId)),
        fetchGroup: groupId => dispatch(fetchGroup(groupId)),
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(
    mstp,
    mdtp
)(AddActsForm);