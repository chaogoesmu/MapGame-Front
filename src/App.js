import React, { Component } from 'react';
import MyMapComponent from './components/MyMapComponent.js';
import Login from './components/login.js';
import JoinGame from './components/joinGame.js';
import './App.css';
// import backend from './globals.js';
// import axios from 'axios';


//set a timer that goes off every 30 seconds and updates the users location.

class App extends Component {
  constructor(props){
    super(props);
    this.state = {myLong:0, myLat:0, loggedIn: 0, token:null};
  }

//have to get the list of active games


//----- GPS coords system ------//
  position = (pos)=>{
    this.setState({myLong :pos.coords.longitude, myLat: pos.coords.latitude});
    return (''
    );
  }
  positionFail = (err)=>{
    console.log('ran into an issue while getting the current position', err)
  }

  setState2 = (obj)=>{this.setState(obj)}
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4FmMXArlh1IGTfq53CxYTH07WlAyi-fM&v=3.exp&libraries=geometry,drawing,places"

  render() {
    console.log('token',this.state.token)
    return (
      <div className="App">
      <Login
      update={this.setState2}
      loggedIn = {this.state.loggedIn}
      />
          <MyMapComponent
            myLat = {this.state.myLat}
            myLong = {this.state.myLong}
            isMarkerShown='true'
            googleMapURL={this.googleMapURL}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
          <JoinGame
          fn={this.setState2}
          />
          {navigator.geolocation.getCurrentPosition(this.position, this.positionFail  )}
          <div>
            Latitude: {this.state.myLat}
            <p> Longitude:  {this.state.myLong}</p>
            </div>
      </div>
    );
  }
}

export default App;

/*
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <h1 className="App-title">Welcome to React</h1>
</header>
<p className="App-intro">
  To get started, edit <code>src/App.js</code> and save to reload</p>
  */
