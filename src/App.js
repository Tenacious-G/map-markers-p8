import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'; //used to fetch data from API

class App extends Component {

  //store the stadia data in a state
  state = {
    stadia: []
  }

  //lifecycle events
  //call "drawMap" when React component mounts
  componentDidMount(){
    this.drawMap()
    this.findVenue()
  }
  
  // must use arrow functions inside a react component, rather than using the function keyword
  drawMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBeBRmkFyV9H18g29KyFlOy4rYBMKR1Qc8&callback=initMap")
    // initialise the map
    window.initMap = this.initMap
  }

  initMap = () => {
    // need "window." object to allow browser to access google
    let map = new window.google.maps.Map(document.getElementById('map'), {
    // center: {lat: -34.397, lng: 150.644}, //Sydney
    center: {lat: 53.883808, lng: -1.264729}, //Tad
    zoom: 12
    });

    //from Marker with Google maps
    var marker = new window.google.maps.Marker({
    position: {lat: 53.883808, lng: -1.264729},
    map: map,
    title: 'Hello Small World!'
  });

  }


  findVenue = () => {
    // details about a venue including location, tips, and categories
    // the foursquare API calls things like venues "endpoints"
    const endpoint = "https://api.foursquare.com/v2/venues/search?"
    // details of a venue
    const parameters = {
      // ll: "-34.397" +","+"150.644", //Sydney
      ll: "53.883808" +","+"-1.264729",     
      client_id: "ESXBILDONBRKSIT1W2OJIUALG5AJTT0FLPMLYZRAF3EI4XTT",
      client_secret: "G21WXNZHQBFNNT5PZDH3LW3EB5HEMTHHNZEQTALMKXV4I23T",
      // ll: "53.883808,-1.264729",
      query: "sport",
      // near: "Sydney",
      v: "20180821"
    }
          // essential parameters
      // response fields
      // radius: 10000, //in metres
      // ll: '53.883808,-1.264729',
      // limit: 1
    // }


  //add details to the venue
  //Yahya tutorial - https://youtu.be/dAhMIF0fNpo

  axios.get(endpoint + new URLSearchParams(parameters))
    //execute this callback when the Promise is resolved
    .then(response => {
      this.setState({
        stadia: response.data.response.venues
      }) 
      console.log(response);
      // console.log(response.data.response.groups[0].items)
      console.log(response.data.response.venues)
      })
    //otherwise (complete the callback function)
    .catch(error => {
      console.log("Error with endpoint " + error )
    })

  }
  render() {
    return (


      // load static map using https://developers.google.com/maps/documentation/javascript/tutorial
      //code put inside "main" as "return" only returns one tag
      <main>
        <div id="map"></div>
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

