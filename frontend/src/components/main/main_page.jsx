import React from 'react';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/main_page.css';

class MainPage extends React.Component {
  constructor(props){
    super(props);
    this.imgLoadCount = 0;
    this.state = {
      loaded: false
    };

    this.addLoadedImage = this.addLoadedImage.bind(this);
  }
  
  componentDidMount() {
    document.title = 'Bro-chella';
  };

  addLoadedImage() {
    this.imgLoadCount++;
    if (document.querySelectorAll('img').length === this.imgLoadCount) {
      let component = document.getElementsByClassName('background-splash')[0];
      component.classList.remove('hidden');
      component.classList.add('fadeIn');
      this.setState({loaded: true});
    };
  };

  render() {
    return (
      <div className='main-landing'>
        <div className='landing-page-container'>
          <section className="why-brochella">
            <h2>Why Bro-chella?</h2>
            <p>
              Ever feel like it's a massive hassle getting all your bros together
              for events like Coachella? Sent out too many texts for an unorganized
              group trip to this coveted music festival? Lost track of who's coming 
              from where, who's hitching a ride with who, and who's bringing the beer?
            </p>
          </section>
          <section className="what-brochella">
            <h2>What is Bro-chella?</h2>
            <p>
              Bro-chella is a platform for organizing your own custom groups
              and itinerary for events like Coachella. With an minimalistic and clean
              design and simple navigation, you can easily create groups that you can
              invite friends to (soon<sup>tm</sup>). Groups have an embedded map for
              your friends to easily find the location of the event, and list out the acts
              that the group is planning to attend, as well as the associated details.
            </p>
          </section>
          <section className="beyond-brochella">
            <h2>Beyond Bro-chella</h2>
            <p>
              Developed by Andrew Chan, Karen Lai, and Kevin Brimmerman, Bro-chella is
              a brief introduction to the MERN stack and the first real experience of a 
              group full stack project for all of us. Working under a five day timeline 
              with no prior experience with the MERN stack, this site was developed upon 
              an idea that could potentially become a real app once fully completed.
            </p>
          </section>
        </div>
        <div className="background-cover">

        </div>
        <div className="background-vertical-cover">
          
        </div>
        <div 
          className="background-splash hidden" 
          onAnimationEnd={(e) => e.currentTarget.classList.remove('fadeIn')}
        >
          <img onLoad={() => this.addLoadedImage()}src="https://images.pexels.com/photos/534031/pexels-photo-534031.jpeg" alt=""/>
          <img onLoad={() => this.addLoadedImage()}src="https://images.pexels.com/photos/1049622/pexels-photo-1049622.jpeg" alt=""/>
          <img onLoad={() => this.addLoadedImage()}src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg" alt=""/>
          <img onLoad={() => this.addLoadedImage()}src="https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg" alt=""/>
          <img onLoad={() => this.addLoadedImage()}src="https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg" alt=""/>
          <img onLoad={() => this.addLoadedImage()}src="https://images.pexels.com/photos/1540338/pexels-photo-1540338.jpeg" alt=""/>
          <img onLoad={() => this.addLoadedImage()}src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg" alt=""/>
          <img onLoad={() => this.addLoadedImage()}src="https://images.pexels.com/photos/1799249/pexels-photo-1799249.jpeg" alt=""/>
          <img onLoad={() => this.addLoadedImage()}src="https://images.pexels.com/photos/354305/pexels-photo-354305.jpeg" alt=""/>
          <img onLoad={() => this.addLoadedImage()}src="https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg" alt=""/>
        </div>
      </div> 
    )
  }
}

export default MainPage;