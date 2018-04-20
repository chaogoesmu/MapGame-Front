import React from 'react';
import axios from 'axios';
import backend from '../globals.js';
import { Button } from 'react-bootstrap';

//let clicked = (fn, state)=>{fn({loggedIn: !state})}
class login extends React.Component{
  constructor(props){
    super(props);
    this.state = {status: this.props.loggedIn, username:'', password:''};
  }

  editUsername=(e)=>{
    this.setState({username:e.target.value})
  }
  editPassword=(e)=>{
    this.setState({password:e.target.value})
  }

  clicked = (fn, state,theButton)=>{
    if(theButton==='login')
    {
      this.setState({status:1})
    }
    if(theButton==='newUser')
    {
      this.setState({status:2})
    }
    if(theButton==='logOff')
    {
      this.setState({status:0})
      fn({token:{id:-1},reset:true})
    }
  }

  login = (fn,state)=>{
    console.log('login attempted');
    axios.get(`${backend}login`, {headers:{username:this.state.username,password:this.state.password}})
    .then(res=>{
      this.setState({status: 3})
      console.log('token change: ',res.data)
      if(res.data.length>0)
      {fn({token:res.data[0]})}
      else {
        this.setState({status: -1});
      }

    })
    .catch(err=>{
      console.log('login error:', err);
      this.setState({status: -1})
    })
  }
  create = (fn)=>{
    console.log('create being called')
    axios.get(`${backend}createUser`, {headers:{username:this.state.username,password:this.state.password}})
    .then(res=>{
      console.log('adding a user worked');
      this.setState({status: 3});
      fn({token:res.data});
    })
    .catch( err=>{
      console.log('create error:',err)
      this.setState({status: -1})
    })
  }


  render=()=>{

    //if already logged in
    if(this.state.status===3)
    {
      return (
        <div>
        <button class="btn btn-danger" onClick = {()=>(this.clicked(this.props.update, this.props.loggedIn, 'logOff'))}>log Off</button>
        </div>
      )
    }

    //route for login
    if(this.state.status===1)
    {
      return (
        <div>
        <div class="form-group">
        <label>Username:</label>
        <input type="username" value={this.state.username} onChange={this.editUsername} />
        </div>
        <div class="form-group">
        <label>Password:</label>
        <input type="password" value={this.state.password} onChange={this.editPassword} />
        </div>
        <button class="btn btn-primary" onClick = {()=>(this.login(this.props.update, this.props.loggedIn, 'logOff'))}>submit</button>
        </div>
      )
    }

    //route for new user
    if(this.state.status===2)
    {
      return (
        <div>
        <div class="form-group">
        <label>Username:</label>
        <input type="username" value={this.state.username} onChange={this.editUsername} />
        </div>
        <div class="form-group">
        <label>Password:</label>
        <input type="password" value={this.state.password} onChange={this.editPassword} />
        </div>
        <button class="btn btn-primary" onClick = {()=>(this.create(this.props.update, this.props.loggedIn))}>create</button>
        </div>
      )
    }

    //if not logged in
    return (
      <div>
      {this.state.status===-1?'Login Failed':''}
      <button class="btn btn-primary" onClick = {()=>(this.clicked(this.props.update, this.props.loggedIn, 'login'))}>login</button>
      <button class="btn btn-success" onClick = {()=>(this.clicked(this.props.update, this.props.loggedIn,'newUser'))}>New User</button>
      </div>
    )
  }
}


export default login;
