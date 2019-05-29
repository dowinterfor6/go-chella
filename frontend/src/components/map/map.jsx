import React from 'react';
import '../../../src/assets/stylesheets/map.css'

class Map extends React.Component {

  componentDidMount() {
    this.mapReady();
  }

  mapReady() {
    const indioGrounds = {lat: 33.6822525, lng: -116.2400298 };

    this.map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 15, 
      center: indioGrounds
    });
    
    new window.google.maps.Marker({
      position: indioGrounds, 
      map: this.map, 
      label: "COACHELLA",
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    });
  }

  addMarker() {
    
  }


  render() {
    return (
      <div className="map-display-container">
        <h1> COACHELLA GROUNDS </h1>
        <div id="map"></div>
      </div>
    )
  }
}

export default Map;