import React from 'react';
import axios from 'axios';
import backend from '../globals.js';


//TODO: refactor this away from a class, while it seems necessary for the text boxes, investigate if it is actually required.
class joinGame extends React.Component{
  constructor(props){
    super(props);
    this.state = {games:[], updateApp:props.fn, inGame: 0, status:0};
    axios.get(`${backend}findGames`)
    .then(res=>{
      console.log('games data',res.data)
      this.setState({games:res.data})
    })
    .catch(err=>{
      console.log('error on the findgames route', err)
    })
  }

  createGame = ()=>{axios.post(`${backend}createGame`)
    .then(result=>{
      console.log('game creation result', result);
    })
    .catch(err=>{
      console.log(err);
      //if this errors on create game, force the game to be none
      this.fn({inGame: 0});
    })
  }


  //TODO:stretch goal, not necessary for MVP.
  joinGame=()=>{

  }

  displayGames=()=>{
    this.state.games.map((x,i)=>{
      return  <span key={i}>{x.name}<button onClick={this.joinGame}>Join</button><br/></span>
    })
  }

  joinGame=(theGame = 'create game')=>{
    return (
      <div>
      <button onClick = {()=>(this.createGame())}>{theGame}</button>
      </div>
    )
  }
  render=(props)=>{
    switch (this.state.status){
      case 0:
        return (
          <div>
          {this.displayGames()}
          {this.joinGame()}
          </div>
        )
        break;
      default:
        return ('unable to render games');
        break;
    }
  }


}

export default joinGame;
