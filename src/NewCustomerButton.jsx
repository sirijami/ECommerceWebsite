import React, { Component } from 'react';
class NewCustomerButton extends Component{

  render(){
    return(<div>
      <button  className= 'buttonStyle' onClick = {this.props.prop2}>I am a new Customer</button>
    </div>)
  }
}
export default NewCustomerButton ;
