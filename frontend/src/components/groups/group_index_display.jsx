import React from 'react';
import { withRouter } from 'react-router-dom';

class GroupIndexDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      acts: {},
      activeGroup: null,
      backgroundUrl: 0
    };

    this.currentActId = null;

    this.handleNavigation = this.handleNavigation.bind(this);
  }

  // componentDidMount() {
  //   this.setBackgroundUrl();
  // }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      acts: nextProps.acts,
      activeGroup: nextProps.activeGroup,
      backgroundUrl: 0
    });
    // this.setBackgroundUrl(nextProps.acts[0]);
    // clearInterval(this.interval);
    // if (nextProps.acts.length > 1) {
    //   this.interval = setInterval(() => {
    //     this.setState({ backgroundUrl: this.state.backgroundUrl + 1 })
    //   }, 5000);
    //   document.getElementsByClassName('in-focus-header')[0].classList.add('fadeIn');
    //   document.getElementsByClassName('act-list-container')[0].classList.add('fadeIn');
    // }
  }

  handleNavigation(e) {
    if (this.props.activeGroup) {
      this.props.history.push(`/groups/${this.props.activeGroup.id}`);
    }
  }

  // setBackgroundUrl(url) {
  //   let displayElement = document.getElementsByClassName('in-focus-display')[0];
  //   if (displayElement) {
  //     if (url) {
  //       displayElement.classList.add('fadeIn');
  //       displayElement.setAttribute('style',
  //         `background: url('${url}');
  //         background-position: center;
  //         background-size: cover;
  //         background-repeat: no-repeat;`
  //       );
  //     };
  //   } 
  // }

  render() {
    let display = (
      <div 
        className='in-focus-display fadeIn' 
        onAnimationEnd={(e) => e.currentTarget.classList.remove('fadeIn')}
        onClick={this.handleNavigation}
      >
        <div className="in-focus-header fadeIn" onAnimationEnd={(e) => e.currentTarget.classList.remove('fadeIn')}>
          Browse through your groups and click to show details!
          Or, check out the discover page and
          create your own to get started!
        </div>
        <div className="in-focus-act">
          <ul className="act-list-container" onAnimationEnd={(e) => e.currentTarget.classList.remove('fadeIn')}>
          </ul>
        </div>
      </div>
    );

    if (this.state.activeGroup) {
      display = (
        <div 
          className='in-focus-display active fadeIn' 
          onAnimationEnd={(e) => e.currentTarget.classList.remove('fadeIn')}
          onClick={this.handleNavigation}
        >
          <div className="in-focus-header fadeIn" onAnimationEnd={(e) => e.currentTarget.classList.remove('fadeIn')}>
            {this.state.activeGroup.name}
          </div>
          <div className="in-focus-acts">
            <ul className="act-list-container" onAnimationEnd={(e) => e.currentTarget.classList.remove('fadeIn')}>
              {Object.keys(this.state.acts).sort().map((key) => (
                <li
                  className={this.state.acts[key].url}
                  key={key}
                >
                  {this.state.acts[key].name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }

    // if (Object.keys(this.state.acts).length > 0) {
    //   let url = this.state.acts[this.state.backgroundUrl % this.state.acts.length].url;
    //   this.setBackgroundUrl(url);
    // };

    return (
      display
    )
  }
}

export default withRouter(GroupIndexDisplay);