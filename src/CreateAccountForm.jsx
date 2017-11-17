import React, { Component } from 'react';


class CreateAccountForm extends Component{
  render(){
    return(<div id= 'createAccountStyle'>
      <h2>Create your Account</h2>
      <label className= 'labelStyle' >Username</label><br/>
      <input className= 'inputStyle' type= 'text' onChange= {this.props.formProp1}></input><br/><br/>
      <label className= 'labelStyle'>Password</label><br/>
      <input className= 'inputStyle' type= 'Password' onChange= {this.props.formprop2}></input><br/><br/>
      <label className= 'labelStyle'> Confirm Password</label><br/>
      <input className= 'inputStyle' type= 'Password'></input><br/><br/>
    </div>)
  }
}
export default CreateAccountForm;
