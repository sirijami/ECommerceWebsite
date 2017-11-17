import React, { Component } from 'react';


class SigninForm extends Component{
  render(){
    return(
       <div id= 'signInSection'>
           <label className= 'labelStyle'> Email </label>
           <br/>
           <input className= 'inputStyle' type='text' onChange= {this.props.formProp1}/>
           <br/><br/>
           <label className= 'labelStyle'> Password </label>
           <br/>
           <input className= 'inputStyle' type='password' onChange= {this.props.formprop2}/>
           <br/><br/>
    </div>)
  }
}
export default SigninForm;
