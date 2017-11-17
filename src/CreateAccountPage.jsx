import React, { Component } from 'react';
import LogoutButton from './LogoutButton';
import SubmitButton from './SubmitButton';
import CreateAccountForm from './CreateAccountForm';

class CreateAccountPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: false
    };
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }
  displayMessage(){
    this.setState({
      message: true
    })
  }

  updateUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  updatePassword(e) {
    this.setState({
     password: e.target.value
    });
  }

  render(){
    // var x = this.state.username;
    // var y = this.state.password;

      return(<div>
      <CreateAccountForm formProp1= {this.updateUsername} formprop2= {this.updatePassword}/>
      <SubmitButton onRegisterAttempt= {this.props.onRegisterAttempt}  bttnProp1= {this.state.username} bttnProp2= {this.state.password} msgProp= {this.displayMessage.bind(this)}  className= 'buttonStyle'/>
      <LogoutButton  className= 'buttonStyle' prop= {this.props.changeState}/>
      {/* {x} , {y} */}

    </div>)
  }
}
export default CreateAccountPage ;
