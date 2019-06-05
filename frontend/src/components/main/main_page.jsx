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

        {/* <div className='landing-page-container'> */}
          <section className="why-brochella">
            <p>
              Ever feel like it's a massive hassle getting all your bros together
              for events like Coachella? Sent out too many texts for an unorganized
              group trip to a coveted music festival? Lost track of who's coming 
              from where, who's hitching a ride with who, and most importantly, who's bringing the beer?
            </p>
          </section>
          
          <div className="parallax-container">
          <div className="parallax"><img src="https://i.pinimg.com/originals/67/a9/a7/67a9a7ee5a6be4378d463609cbd8b8ee.jpg" alt="" /></div>
          <h1>WE HANDLE THE STRESS, SO YOUR EVENT IS A SUCCESS.</h1>
          </div>

          <section className="what-brochella">
            <p>
              Go-chella is a platform for planning an itinerary with your friends for the Coachella event. 
              With a simplistic and minimalistic design, you can easily navigate through the site to create groups where you can
              invite friends (soon<sup>tm</sup>) and organize your trip activities. Trip activities will entail location whereabouts, 
              artists you plan on seeing, and friends you have invited. With each group you create, you will be able to explore the event grounds,
              detailed information reagrding each artist associated to your agenda, and affiliated members' profiles (soon<sup>tm</sup>).
            </p>
          </section>

          <div className="parallax-container">
          <div className="parallax"><img src="https://peopledotcom.files.wordpress.com/2019/04/coachella-2.jpg" alt="" /></div>
          <h1>EVERY DETAIL MATTERS.</h1>
          </div>
          <section className="beyond-brochella">
            <p>

              Developed by Andrew Chan, Karen Lai, and Kevin Brimmerman, Bro-chella is
              a brief introduction to the MERN stack and the first real experience of a 
              group full stack project for all of us. Working under a five day timeline 
              with no prior experience with the MERN stack, this site was developed upon 
              an idea that could potentially become a real app once fully completed.
            </p>
          </section>
        {/* </div> */}



        <div className="background-cover">

        </div>
        <div className="background-vertical-cover">
          
        </div>
        {/* <div 
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
        </div> */}
      </div> 
    )
  }
}

export default MainPage;