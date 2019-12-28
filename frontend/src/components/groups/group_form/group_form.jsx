// import React from 'react';
// import { withRouter } from 'react-router-dom';
// //file still needs to render errors

// class GroupForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.renderErrors = this.renderErrors.bind(this);
//   }

//   componentDidMount() {
//     this.setState({ group: this.props.group }); 
//   }

//   componentWillReceiveProps(nextProps) {
//     this.setState({ errors: nextProps.errors });
//   }

//   componentWillUnmount() {
//     this.props.deleteGroupErrors();
//     this.props.closeModal();
//   }

//   update(field) {
//     return (e) => this.setState({
//       [field]: e.currentTarget.value
//     });
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     debugger
//     this.props.createGroup(this.state);
//   };

//   renderErrors() {
//     return (
//       <ul>
//         {Object.values(this.state.errors).map((error, idx) => (
//           <li key={`error-${idx}`}>
//             {error}
//           </li>
//         ))}
//       </ul>
//     );
//   }

//   render() {
//     return (
//       <div className="session-form-modal"
//         onClick={(e) => e.stopPropagation()}
//         onAnimationEnd={(e) => {
//           e.currentTarget.classList.remove('fadeInDown');
//           e.currentTarget.classList.remove('shake');
//         }}
//       >

//         Hey Hi Ho ~this is the Group form :p 
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Name ya Group: 
//             <input type="text" value={this.state.name} onChange={this.update("name")} />
//           </label>

//           {/* <div className="error-message"> */}
//             {this.props.errors ? ` - ${this.props.errors}` : ''}
//           {/* </div> */}
//           {/* <label>
//             Add some buds:
//             <input type="text" value={this.state.members} onChange={this.update("members")} />
//           </label> */}
//           {/* <label>
//             Acts y'all are attending:
//             <input type="text" value={this.state.acts} onChange={this.update("acts")} />
//           </label> */}
//           <input type="submit" value="Submit Group" />
//         </form>
//       </div>
//     )
//   }
// }

// export default withRouter(GroupForm);