import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  //lifecycle events
  //call "loadMap" when React component mounts
  componentDidMount(){
    this.loadMap();
  }
  
  // must use arrow function inside a react component, rather than using the function keyword
  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBeBRmkFyV9H18g29KyFlOy4rYBMKR1Qc8&callback=initMap")
    // initialise the map
    window.initMap = this.initMap
  }

  initMap = () => {
  // function initMap() {
    // need "window." to allow browser to access google
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
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
/*  <script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBeBRmkFyV9H18g29KyFlOy4rYBMKR1Qc8&callback=initMap"
    async defer></script>
    </script>
*/

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
