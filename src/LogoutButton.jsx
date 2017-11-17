import React, { Component } from 'react';
class LogoutButton extends Component{
  render(){
    return(<div>
      <br/>
      <button  className= 'buttonStyle' onClick= {this.props.prop}>Log Out</button>
    </div>)
  }
}
export default LogoutButton;
