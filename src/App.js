import react, {Component} from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Navbar from "./Components/Navbar";
import Menu from "./Components/Menu";
import Cart from "./Components/Cart";
import Admin from "./Components/Admin";
import ItemForm from "./Components/ItemForm";

import './App.css';
import React from "react";
import axios from "axios";



class App extends Component {
  state={
    products:[],
    cartItems:[]
  }
  componentDidMount(){
    this.getData();
  }
  getData= async ()=>{
    const {data}= await axios.get("http://localhost:3000/products");
    this.setState({products:data})
  }
  //Handle add to cart items
  handelAddToCart=productID=>{
    const cartItems= this.state.cartItems;
    if(this.checkItemInCart(productID,cartItems)){
      alert("Item is already in cart")  
    }
    else{
      const reqItemArr=this.state.products.filter(p=>{return p.id===productID});
      const reqItemObj={...reqItemArr[0]};
      const qty={qty:0};
      const cartItem={...reqItemObj,...qty}
      cartItems.push(cartItem);
      this.setState({cartItems});
    }
  }
//check the item exist in the cart
  checkItemInCart=(itemId, cartItems)=>{
    if (cartItems.length===0){
      return false; //item isn't exist
    }
    else {
      let index=cartItems.map((item)=>{return item.id}).indexOf(itemId);
      return (index!==-1) //false: item isn't exist , true: item is exist
      }
    }
// handle increase qty
handleIncrease=(productID)=>{
  const cartItems= this.state.cartItems;

  const reqItem=cartItems.filter(i=>{return i.id===productID});
  reqItem[0].qty+=1;
  this.setState({cartItems});
}

//handle Decrease
handleDecrease=(productID)=>{
  const cartItems= this.state.cartItems;

  const reqItem=cartItems.filter(i=>{return i.id===productID});
  if (reqItem[0].qty!==0){
    reqItem[0].qty-=1;
    this.setState({cartItems});
  }
}
/****************Handle Remove********************/ 
handleRemove=(productID)=>{
  const cartItems= this.state.cartItems;
  const reqItem=cartItems.filter(i=>{return i.id!==productID});
  this.setState({cartItems: reqItem});
}

/****************Handle Reset********************/ 
handleReset=(productID)=>{
  const cartItems= this.state.cartItems;
  const reqItem=cartItems.filter(i=>{return i.id===productID});
  reqItem[0].qty=0;
  this.setState({cartItems});
}
/****************Handle Delete********************/ 
handleDelete=async id=>{
  const path=`http://localhost:3000/products/${id}`;
  await axios.delete(path);
  this.getData();
}

  render(){
    return(
        <BrowserRouter>
          <React.Fragment>
            <Navbar itemsQty={this.state.cartItems.length}/>
            <Switch>
              <Route exact path="/" component={()=><Menu products={this.state.products} 
              addToCart={this.handelAddToCart}
              itemInCart={this.checkItemInCart}/>}/>  
              <Route path ="/Cart" component={()=><Cart cartItems={this.state.cartItems} 
              qtyIncrease={this.handleIncrease}
              qtyDecrease={this.handleDecrease}
              qtyReset={this.handleReset}
              removeItem={this.handleRemove}/>}/>
              <Route path="/Admin" component={(props)=><Admin {...props} products={this.state.products} deleteItem={this.handleDelete}/>}/>
              <Route path="/New" component={(props)=><ItemForm {...props} update={this.getData}/>}/>
              <Route path="/edit/:id" component={(props)=><ItemForm {...props} update={this.getData}/>}/>
            </Switch>
          </React.Fragment>
        </BrowserRouter>
    );
  }
}
export default App;
