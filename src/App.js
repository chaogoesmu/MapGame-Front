import React, { Component } from 'react';
import logo from './logo.svg';
import MyMapComponent from './components/MyMapComponent.js';
import './App.css';

// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
//
// const MyMapComponent = withScriptjs(withGoogleMap((props) =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//     {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//   </GoogleMap>
// ))


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <MyMapComponent
  isMarkerShown
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4FmMXArlh1IGTfq53CxYTH07WlAyi-fM&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
/>
      </div>
    );
  }
}

export default App;
