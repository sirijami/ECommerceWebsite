import React, { Component } from 'react';
import FilterableProductTable from './FilterableProductTable';
import LogoutButton from './LogoutButton';

class BodyPage extends Component{

  render(){
    return(<div>
      <FilterableProductTable updateTable= {this.props.loadedProp} products= {this.props.productInfoProp}/>
      <LogoutButton className= 'buttonStyle' prop= {this.props.changeState}/>
    </div>)
  }
}
export default BodyPage ;
