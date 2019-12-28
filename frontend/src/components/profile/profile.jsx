import React from 'react';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/profile.css';

class Profile extends React.Component {
  componentDidMount() {
    document.title = 'Profile';
  }

  render() {
    return (
      <div className="profile-container">
        <img src="https://media.giphy.com/media/S5JSwmQYHOGMo/giphy.gif" alt="Under Construction"/>
      </div>
    );
  }
}

export default Profile;