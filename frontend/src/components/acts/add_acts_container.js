import React from 'react';
import { connect } from 'react-redux';
import { fetchGroup, updateGroup } from '../../actions/group_actions';
import { fetchAct } from '../../actions/act_actions';
import { closeModal } from '../../actions/modal_actions';
import '../../assets/stylesheets/modal.css';

class AddActsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.act;
    }

    componentDidMount() {
        this.setState({ act: this.props.act });
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
    
        return (
            <div className="add-act-modal">

                <h1 className="delete-header">Add This Act</h1>

                <select>
                    
                </select>

            </div>
        )
    }
}

const mstp = (state, ownProps) => {
    return {
        act: state.act,
        formType: 'Add Act'
    };
};

const mdtp = (dispatch) => {
    return {
        fetchAct: id => dispatch(fetchAct(id)),
        upateGroup: group => dispatch(updateGroup(group)),
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(
    mstp,
    mdtp
)(AddActsForm);