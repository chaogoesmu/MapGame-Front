import React from 'react';
import axios from 'axios';
import backend from '../globals.js';
import { Button } from 'react-bootstrap';


//TODO: refactor this away from a class, while it seems necessary for the text boxes, investigate if it is actually required.
class joinGame extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      games:[],
      updateApp:props.fn,
      status:0,
      gameName:'',
      gameNum:-1,
      otherPlayersInGame:[]
    };
    //status: 0 not in a game, list games, have the create game option
    //status: 1 creating a game, display text to name it with a create button.
    //status: 2 in a game, should have a quit option.
    console.log('initial state: ',this.state)
    this.findGame();
  }

  findGame =()=>{
    axios.get(`${backend}findGames`)
    .then(res=>{
      this.setState({games:res.data})
      console.log('games data',this.state.games)
    })
    .catch(err=>{
      console.log('error on the findgames route', err)
    })
  }

  createGame = (name)=>{
    //console.log('createGame called?', this.state)
    axios.post(`${backend}createGame`, {gameName:name, pID: this.props.pID, pLat: this.props.myLat, pLong: this.props.myLong})
    .then(result=>{
      //console.log('game creation result', result);
      this.setState({status:1, gameNum:result.data[0]})
      this.state.updateApp({gID:result.data[0],amIIt:true});
      //players lat and long for the start position of the game usage can be pushed to post MVP
    })
    .catch(err=>{
      console.log('create game error: ', err);
      //if this errors on create game, force the game to be none
      this.setState({status: 0});
    })
  }


  //TODO:use better naming for this entire function
  joinGame=(id=-1, name, pid)=>{
    if(pid === this.props.pID)
    {
      console.log('this should not be able to happen, game creator has joined their own game')
      return;
    }
    //console.log(`attempting to join game: ${id}, name: ${name} `)
    axios.post(`${backend}joinGame`, {gameID: id, pID: this.props.pID, pLat: this.props.myLat, pLong: this.props.myLong})
    .then(result=>{
      console.log('game join result', result);
      this.setState({status:1, gameName: name})
      this.state.updateApp({gID:result.data[0]})
      //players lat and long for the start position of the game can be pushed to post MVP
    })
    .catch(err=>{
      console.log(err);
      //if this errors on create game, force the game to be none
      this.setState({status: 0});
    })
  }

  quitGame=(id=-1, name)=>{
    if(id===this.props.gameNum)
    {
      axios.post(`${backend}deleteGame`, {pID:this.props.gameNum})
      .then(x=>{
        console.log(x);
        this.setState({status: 0, gameNum:-1});
      })
      this.findGame();
      return;
    }
    //console.log(`quitting... or something`)
    axios.post(`${backend}quit`, {gameID: id, uid: this.props.pID})
    .then(result=>{
      console.log('game quit result', result);
      this.setState({status:0, gameName: ''})
      //players lat and long for the start position of the game can be pushed to post MVP
    })
    .catch(err=>{
      console.log(err);
      //if this errors on quit game, force the game to be none
      //TODO re-evlauate this decision
    })
    this.findGame();
  }


  displayGames=()=>{
    //console.log('games list',this.state.games)
    return this.state.games.map((x,i)=>{
      return  <span key={i}>{x.name}<button class="btn btn-default" onClick={()=>(this.joinGame(x.id, x.name, x.pid))}>Join</button><br/></span>
    })
  }

  editGameName=(e)=>{
    this.setState({gameName:e.target.value})
  }

  showOther=()=>
  {

  }

  render=(props)=>{
    switch (this.state.status){
      case 0://default
        if(this.props.pID===-1)
        {
          return '';
        }
        return (
          <div>
          {this.displayGames()}
          <div class="form-group">
          <label>Game Name:</label>
          <input type="username" value={this.state.gameName} onChange={this.editGameName} />
          </div>
          {<button class="btn btn-default" onClick = {()=>(this.createGame(this.state.gameName))}>Create Game</button>}
          </div>
        )
      case 1://in a game
        return (
          <div>
          <button onClick = {()=>(this.quitGame())}>quit game</button>
          </div>
        )
      default:
        return ('unable to render games');
    }
  }


}

export default joinGame;

//quit game needs to be added.  If the quitter is the games creator, the game should then disband, but thats going to need to be handled on the back end
