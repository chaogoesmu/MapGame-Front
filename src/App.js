import React, { Component } from 'react';
import MyMapComponent from './components/MyMapComponent.js';
import Login from './components/login.js';
import JoinGame from './components/joinGame.js';
import './App.css';
import backend from './globals.js';
import axios from 'axios';


//set a timer that goes off every 30 seconds and updates the users location.

class App extends Component {
  constructor(props){
    super(props);
    this.state = {myLong:0, myLat:0, gID: -1, token:{id:-1}, users:[], amIIt:false, reset:false, gameOver:false};
    this.timer = setInterval(this.tick, 30000);
    this.GPSUpdate();
  }

//have to get the list of active games


//----- GPS coords system ------//
  GPSUpdate = ()=>{navigator.geolocation.getCurrentPosition(this.position, this.positionFail  )}

  position = (pos)=>{
    this.setState({myLong :pos.coords.longitude, myLat: pos.coords.latitude});
    //data.updateItLocation(req.body.gID, req.body.pID, req.body.pLat, req.body.pLong)
    return (''
    );
  }


  //TODO: tie this in to the map and getting who is in the game.
  tick = () => {
    this.GPSUpdate();
    console.log('timer is running')
    axios.post('', )
    this.getActiveUsers();
    if(this.state.reset)
    {
      this.reset();
    }
  }

  getActiveUsers=()=>{
    axios.post(`${backend}getActiveUsers`, {gameID: this.state.gID})
    .then(result=>{
      //players lat and long for the start position of the game usage can be pushed to post MVP
      console.log('get users: ',result);
      this.setState({users:result.data});
    })
    .catch(err=>{
      console.log('get players error: ', err);
      //if this errors on create game, force the game to be none
      this.setState({status: 0});
    })
  }


  reset = ()=>{
    this.setState = {gID: -1, token:this.state.token, users:[], amIIt:false,reset:false};
  }

  positionFail = (err)=>{
    console.log('ran into an issue while getting the current position', err)
    //this.GPSUpdate();
  }

  capture=()=>{
    console.log('capture attempted')
    axios.post(`${backend}capture`, {gID: this.state.gID,pLat: this.state.myLat,pLong:this.state.myLong})
    .then(x=>console.log('capture result',x))
    if(this.state.amIIt)
    {
      axios.post(`${backend}updateItLocation`,{gID:this.state.gID, pID:this.state.token.id, pLat:this.state.myLat, pLong:this.state.myLong})//req.body.gID, req.body.pID, req.body.pLat, req.body.pLong
      .then(x=>{})
      .catch(err=>{console.log('player is it and something went wrong with the update')})
    }
  }

  setState2 = (obj)=>{
    this.setState(obj)
    if(this.state.reset)
    {
      this.reset();
    }
  }
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4FmMXArlh1IGTfq53CxYTH07WlAyi-fM&v=3.exp&libraries=geometry,drawing,places";

  render=()=>{
    if(this.state.gameOver)
    {
      return(
        <button onClick = {()=>(this.reset())}>Game Over</button>:''
      )
    }
    let onlyShowOnLogin=''
    if(this.state.token.id!==-1)
    {
      onlyShowOnLogin =(
        <div>
        <MyMapComponent
          myLat = {this.state.myLat}
          myLong = {this.state.myLong}
          isMarkerShown='true'
          googleMapURL={this.googleMapURL}
          users={this.state.users}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <JoinGame
          fn={this.setState2}
          myLat = {this.state.myLat}
          myLong = {this.state.myLong}
          pID = {this.state.token.id}
        />
        </div>
      )
    }
    console.log(this.state.gID)
    return (
      <div className="App">
      <Login
        update={this.setState2}
        loggedIn = {this.state.loggedIn}
      />

          {onlyShowOnLogin}
          {this.state.amIIt?<button onClick = {()=>(this.capture())}>capture</button>:''}
      </div>
    );
  }
}

export default App;
