import React, { Component } from 'react';
class SigninButton extends Component{

  doLogin(){
    this.props.onLoginAttempt({
        username: this.props.bttnProp1,
        password: this.props.bttnProp2
    })
  }
  render(){
    return(<div>
      <button  className= 'buttonStyle' onClick= {this.doLogin.bind(this)}>Sign in</button>
    </div>)
  }
}
export default SigninButton;
