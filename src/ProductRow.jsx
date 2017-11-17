import React, { Component } from 'react';

class ProductRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      addTocart: true,
      placeOrder: false,
      shipping: false,
      bgColor: 'darkblue'
    }
  }

  handleAddToCart(){
   this.setState({
      addTocart: false,
      placeOrder: !this.state.placeOrder,
      shipping: false,
      bgColor: 'green'
   })
  }
  render() {
    let text;
    if(this.state.addTocart === true && this.state.placeOrder === false && this.state.shipping ===false){
      text = 'Added to Cart'
    }else if( this.state.addTocart === false && this.state.placeOrder === true && this.state.shipping === false) {
      text = 'Place Order'
    } else if( this.state.addTocart === false && this.state.placeOrder === false && this.state.shipping === false){
      text = 'Ready to ship'
    }
    let name = this.props.product.stocked ? this.props.product.name :
      <span style={{color: 'black'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
        <td>{this.props.product.estmDeliveryTime}</td>
        <td><input type= 'number' placeholder= 'Enter no'></input></td>
        <td><button className= 'stateButton' onClick= {this.handleAddToCart.bind(this)} style={{backgroundColor:this.state.bgColor}}>{text}</button></td>
      </tr>
    );
  }
}


export default  ProductRow ;
