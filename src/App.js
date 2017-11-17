import React, { Component } from 'react';
import styles from './App.css';
import {signIn, productRequest, register} from './services.js'


import Header from './Header';
import SigninPage from './SignInPage';
import BodyPage from './BodyPage';
import CreateAccountPage from './CreateAccountPage';

class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      accountIn: false,
      loaded: false
    };
    this.product = [];
    this.token = '';
  }

  gotosigninPage(){
    this.setState({
      authenticated:false,
      accountIn: false
    });
  }

  gotoaccountPage(){
    this.setState({
      authenticated: false,
      accountIn: true
    });
  }
  onLoginAttempt({username,password}) {
    signIn(username, password)
    .then( ( response ) => {
      if(response.ok === false){
        return Promise.reject(response);
      }
          this.token = response.token;
          return this.token;
    })
    .then( ( loginInfo ) => {
      productRequest(loginInfo)
      .then((response) =>{
        this.product = response.details;
        this.setState({
          authenticated: true,
          accountIn: false,
          loaded : true,
          // username: loginInfo.username,
          // userLevel: loginInfo.userLevel,
          loginError: ''
        });
        return this.product;
      })
      .then((productInfo) => {
        // console.log('the product ' , productInfo);
        this.product = productInfo;
      })
      .catch((error) => {
        // console.log('Error loading product Information');
      });
    })
    .catch( (error) => {
      this.setState({
        loginError: 'Enter valid username and password'
      });
    });



  }
  onRegisterAttempt({username, password}){
    register({username,password})
  }

  // onLogoutAttemp({username, token}){
  //   logout({username, token})
  // }

 render() {
   let pageSwitch;
   if(this.state.authenticated === false && this.state.accountIn === false){
     pageSwitch = <SigninPage onLoginAttempt={this.onLoginAttempt.bind(this)} authProp= {this.state.authenticated} changeState2= {this.gotoaccountPage.bind(this)} loginError= {this.state.loginError}/>
   } else if(this.state.authenticated === false  && this.state.accountIn === true){
     pageSwitch = <CreateAccountPage changeState= {this.gotosigninPage.bind(this)} onRegisterAttempt= {this.onRegisterAttempt.bind(this)}  />
   } else if(this.state.authenticated === true  && this.state.accountIn === false){
     pageSwitch = <BodyPage  loadedProp= {this.state.loaded} changeState= {this.gotosigninPage.bind(this)} productInfoProp= {this.product} />
   }

    return (
      <div>
        <Header/>
        {pageSwitch}
      </div>
    );
  }
}

export default App;
