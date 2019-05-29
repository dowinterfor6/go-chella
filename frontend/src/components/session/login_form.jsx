import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/session_form.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount() {
    let component = document.getElementsByClassName('session-form-modal')[0];
    component.classList.add('fadeInDown');
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.errors });
  }

  componentWillUnmount() {
    this.props.deleteErrors();
    this.props.closeModal()
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.currentTarget.value
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.login(user)  
      .then(() => {
        if (this.props.errors.length === 0) {
          this.props.closeModal();
        } else {
          let component = document.getElementsByClassName('session-form-modal')[0];
          component.classList.add('shake');
  
          let form = document.querySelector('form');
          if (!form.classList.value.includes('error')) {
            form.classList.add('error');
          };
        };
      });
  }

  handleDemoLogin(e) {
    const demoUser = {
      username: 'demo_user',
      password: 'password'
    };
    this.props.login(demoUser)
      .then(() => {
        if (this.props.errors.length === 0) {
          this.props.closeModal();
        };
      });
  }

  renderErrors() {
    return(
      <ul>
        {Object.values(this.state.errors).map((error, idx) => (
          <li key={`error-${idx}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div 
        className="session-form-modal" 
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={(e) => {
          e.currentTarget.classList.remove('fadeInDown');
          e.currentTarget.classList.remove('shake');
        }}
      >
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div className="label-message-container">
              Username &nbsp;
              <div className="error-message">
                {this.props.errors.username ? ` - ${this.props.errors.username}` : ''}
              </div>
            </div>
            <input 
              type="text" 
              value={this.state.username} 
              onChange={this.update('username')}
            />
          </label>
          <label>
            <div className="label-message-container">
              Password &nbsp;
              <div className="error-message">
                {this.props.errors.password ? ` - ${this.props.errors.password}` : ''}
              </div>
            </div>
            <input 
              type="password"
              value={this.state.password}
              onChange={this.update('password')}
            />
          </label>
          <a 
            className='hvr-underline-from-center' 
            onClick={this.handleDemoLogin}
          >
            Forgot your password? (Demo Login)
          </a>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default withRouter(LoginForm);