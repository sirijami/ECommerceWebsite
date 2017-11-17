import React, { Component } from 'react';

class SubmitButton extends Component{
  doRegister(){
    this.props.onRegisterAttempt({
        username: this.props.bttnProp1,
        password: this.props.bttnProp2
    });
    this.props.msgProp;
  }


  render(){
    return(<div>
      <button className= 'buttonStyle' onClick= {this.doRegister.bind(this)}>Submit</button>
    </div>)
  }
}

export default SubmitButton;
