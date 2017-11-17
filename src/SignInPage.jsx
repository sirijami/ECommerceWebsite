import React, { Component } from 'react';
import SigninForm from './SignInForm';
import SigninButton from './SignInButton';
import NewCustomerButton from './NewCustomerButton';

class SigninPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: 'Empty Username',
      password: 'Empty psw'
    };
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
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
    let errorMessage = this.props.loginError;
    return(<div>
          <SigninForm  formProp1= {this.updateUsername} formprop2= {this.updatePassword}/>
          <SigninButton onLoginAttempt= {this.props.onLoginAttempt}  bttnProp1= {this.state.username} bttnProp2= {this.state.password} authProp= {this.props.authProp}/>
          <p className='errorMessage'>{errorMessage}</p>
          <br/>
          <p className='updateEmail'>Don't have a account yet? Then create new account</p>
          <NewCustomerButton prop2= {this.props.changeState2} />
          <br/><br/><br/>
          <p className='updateEmail'> By signing in you are agreeing to our <a href= ''>Conditions of Use and Sale </a>and our <a href=''>Privacy Notice</a></p>
          <p className='updateEmail'> Has your email address changed? <a href= ''>Update it here</a></p>
    </div>)
  }
}
export default SigninPage;
