import React from 'react';
import '../../assets/stylesheets/reset.css';
import '../../assets/stylesheets/main_page.css';
import M from 'materialize-css/dist/js/materialize.js';
// import 'materialize-css/dist/css/materialize.css';


class MainPage extends React.Component {
  constructor(props){
    super(props);
    this.imgLoadCount = 0;
    this.state = {
      loaded: false
    };

    // this.addLoadedImage = this.addLoadedImage.bind(this);
  }
  
  componentDidMount() {
    document.title = 'Go-chella';
    M.AutoInit();
  };

  // addLoadedImage() {
  //   this.imgLoadCount++;
  //   if (document.querySelectorAll('img').length === this.imgLoadCount) {
  //     let component = document.getElementsByClassName('background-splash')[0];
  //     component.classList.remove('hidden');
  //     component.classList.add('fadeIn');
  //     this.setState({loaded: true});
  //   };
  // };

  render() {
    return (
      <div className='main-landing'>
        <div className="parallax-container">
          <div className="parallax"><img src="http://www.lagunabeachmagazine.com/wp-content/uploads/2019/03/Coachella-3.jpg" alt="" /></div>
          <h1>PLAN AN EXCEPTIONAL EXPERIENCE, EVERYTIME.</h1>
        </div>

        <section className="why-brochella">
          <div className="friends-photo"></div>
          <div className="p">
          <h3>Gather Your Crew</h3>
            Ever feel like it's a massive hassle getting all your bros together
            for events like Coachella? Sent out too many texts for an unorganized
            group trip to a coveted music festival? Lost track of who's coming 
            from where, who's hitching a ride with who, and most importantly, who's bringing the beer?
          </div>
        </section>
        
        <div className="parallax-container">
          <div className="parallax">
            <img src="https://i.pinimg.com/originals/67/a9/a7/67a9a7ee5a6be4378d463609cbd8b8ee.jpg" alt="" />
          </div>
          <h1 style={{ color: "white", lineHeight: 1.5 }}>WE HANDLE THE STRESS, SO YOUR EVENT IS A SUCCESS.</h1>
        </div>

        <section className="what-brochella">
          <div className="p">
            <h3>The Only App You'll Need</h3>
            Go-chella is a platform for planning an itinerary with your friends for the Coachella event. 
            With a simplistic and minimalistic design, you can easily navigate through the site to create groups where you can
            invite friends (soon<sup>tm</sup>) and organize your trip activities. Trip activities will entail location whereabouts, 
            artists you plan on seeing, and friends you have invited. With each group you create, you will be able to explore the event grounds,
            detailed information reagrding each artist associated to your agenda, and affiliated members' profiles (soon<sup>tm</sup>).
          </div>
          <div className="more-friends"></div>        
        </section>

        <div className="parallax-container">
        <div className="parallax"><img src="https://peopledotcom.files.wordpress.com/2019/04/coachella-2.jpg" alt="" /></div>
        <h1>EVERY DETAIL MATTERS.</h1>
        </div>
        <section className="get-started">
          <p>
            So, what are you waiting for?
            <br />
            Plan your fun seriously.
          </p>
        </section>
      
        <div className="background-cover"></div>
        <div className="background-vertical-cover"></div>
      </div> 
    )
  }
}

export default MainPage;