import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchGroup, updateGroup } from '../../../actions/group_actions';
import { closeModal } from '../../../actions/modal_actions';
import '../../../assets/stylesheets/modal.css'

class GroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: this.props.group,
      name: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ group: this.props.group, name: this.props.group.name }); 
  }

  componentWillUnmount() {
    this.props.closeModal();
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const group = Object.assign({}, this.state.group);
    group.name = this.state.name;
    this.props.updateGroup(group).then(this.props.closeModal).then(this.props.history.push('/dashboard'));
  };

  render() {

    if(!this.state.group) {
      return null;
    }
    
    return (
      <div className="delete-form-modal"
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={(e) => {
          e.currentTarget.classList.remove('fadeInDown');
          e.currentTarget.classList.remove('shake');
        }}
      >

        <h1 className='delete-header'>Edit group</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <p className="create-message">Group name:</p> 
            <input type="text" className="create-input" value={this.state.name} onChange={this.update('name')} />
          </label>
          <button className="create-button" type="submit" value="Submit Group">Edit Group</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let group = state.groups[ownProps.location.pathname.split('/')[2]];
  return {
    group,
    formType: 'Edit Group',
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGroup: (id) => dispatch(fetchGroup(id)),
    updateGroup: (group) => dispatch(updateGroup(group)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupForm));