import React from 'react';
import { connect } from 'react-redux';
import { fetchGroup, updateGroup } from '../../actions/group_actions';
import { fetchAct } from '../../actions/act_actions';
import { fetchUserGroups, fetchOneUser } from '../../actions/user_actions';
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
            group: '',
            theUser: ''
        }
        this.updateGroupActs = this.updateGroupActs.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchOneUser(this.props.currentUser.id)
            .then((res) => {
                this.setState({ theUser: res.user.data });
            })
            .then(() => {
                this.state.theUser.groups.forEach((group) => {
                    this.props.fetchGroup(group)
                        .then((theRealGroup) => {
                            this.setState({ [theRealGroup.group.data.id]: theRealGroup.group.data })
                        })
                })
            })
        this.setState({ group: this.props.groups[Object.keys(this.state)[4]] })
        this.setState({ loading: false });
    }

    updateGroupActs() {
        return (e) => this.setState({
            group: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let daGroup;
        if(typeof this.state.group === 'object') {
            daGroup = this.state.group;
        } else {
            daGroup = this.state[this.state.group];
        }
        daGroup.acts.push(this.state.act._id);
        this.props.updateGroup(daGroup);
        alert('Act Successfully Added!');
        this.props.closeModal();
    }

    render() {

        if (this.state.loading) {
            return <Loading />
        };

        if(!this.state.group) {
            this.setState({ group: this.props.groups[Object.keys(this.state)[4]] });
        }

        console.log(this.state.group);
        let groups = (
            Object.keys(this.state).slice(4).sort().map((key, idx) => (
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
        groups: state.groups,
        act: state.acts,
        currentUser: state.session.user
    };
};

const mdtp = dispatch => {
    return {
        fetchOneUser: id => dispatch(fetchOneUser(id)),
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