import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios'; //used to fetch data from API
// import InfoWindow from 'react.google.maps'

class App extends Component {

  //store the venues data in a state
  state = {
    buildings: [],
  }

  //lifecycle events
  componentDidMount(){
    this.findVenues()
  }
  
  // must use arrow functions inside a react component, rather than using the function keyword
  drawMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBeBRmkFyV9H18g29KyFlOy4rYBMKR1Qc8&callback=initMap")
    // initialise the map
    window.initMap = this.initMap
  }

  findVenues = () => {
    // details about a venue including location, tips, and categories
    // the Foursquare API calls things like venues "endpoints"
    const endpoint = "https://api.foursquare.com/v2/venues/explore?"
    // details of a venue
    const parameters = {
      // essential parameters
      //lat and long co-ordinates for Tadcaster
      ll: "53.883808,-1.264729", 
      client_id: "ESXBILDONBRKSIT1W2OJIUALG5AJTT0FLPMLYZRAF3EI4XTT",
      client_secret: "G21WXNZHQBFNNT5PZDH3LW3EB5HEMTHHNZEQTALMKXV4I23T",
      query: "stadium",
      v: "20182408",
      //optional parameters
      //return no more than 20 results
      limit: 20
    }
    //add details to the venue
    //used Yahya Elharony's tutorial - https://youtu.be/dAhMIF0fNpo
    //"Get venues from Foursquare API in React"
    axios.get(endpoint + new URLSearchParams(parameters))
      //execute this callback when the Promise is resolved
     .then(response => {
        this.setState({
          buildings: response.data.response.groups[0].items
          //the callback function drawMap() is used here to draw the markers
          // only once the data has loaded from the Foursquare API
        }, this.drawMap())
      })
      //otherwise (complete the callback function)
      .catch(error => {
        console.log("Error with endpoint " + error )
      })
  }

    initMap = () => {
    // need "window." object to allow browser to access google variable
    let map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 53.883808, lng: -1.264729}, //Tadcaster
    zoom: 10
    })
      //adapted from InfoWindow with Google maps - https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
      let infowindow = new window.google.maps.InfoWindow({
        //fill the content of the infoWindow only when it is clicked
        // content: contentString
      });

    //loop over the state to produce Markers for each venue
    this.state.buildings.map(sportyPlaces => {
      let contentString = '<p>' + sportyPlaces.venue.name + '<br/>' + sportyPlaces.venue.location.address  + '<br/>' + sportyPlaces.venue.location.city + '</p>'

      //adapted from Marker with Google maps - https://developers.google.com/maps/documentation/javascript/markers
      let marker = new window.google.maps.Marker({
        position: {lat: sportyPlaces.venue.location.lat, lng: sportyPlaces.venue.location.lng},
        map: map,
        title: sportyPlaces.venue.name,
        animation: window.google.maps.Animation.DROP
      })

    marker.addListener('click', function() {
      //make marker bounce if it is still and vice-versa
      toggleBounce()
      //show InfoWindow
      infowindow.setContent(contentString)
      infowindow.open(map, marker);
    });

    //adapted from Marker Animations with Google Maps  https://developers.google.com/maps/documentation/javascript/examples/marker-animations
    
        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
            // revert to the original icon when user wants to stop icon from bouncing
            marker.setIcon('http://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png')
          } else {
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/purple-dot.png')
            marker.setAnimation(window.google.maps.Animation.BOUNCE);      
          }
        }
        return "arrow function expects a value to be returned"
    })
  }

  render() {
    return (
      /* load static map using https://developers.google.com/maps/documentation/javascript/tutorial
      //code put inside "main" as "return" only returns one tag*/
      <main>        
        <div id="map">
        </div>
      </main>
    );
  }
}

function loadScript(url){
  //the reference to the script tag, select the first one
  let reference = window.document.getElementsByTagName("script")[0]
  let script = window.document.createElement("script")
  // set values for the properties of the script tags
  script.src = url
  script.async = true
  script.defer = true
  // keep this script at the start of the list of scripts
  reference.parentNode.insertBefore(script, reference)
}
export default App;

