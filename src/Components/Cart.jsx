import React from "react";
import CartItem from "./CartItem";

import "./Cart.css";

function Cart (probs){
    const {qtyIncrease, qtyDecrease, qtyReset,removeItem}=probs;
    return(
        <React.Fragment>
            <h3 className="shopping-pg-title">The cart items:</h3>
            <div>
                {probs.cartItems.map(cartItem=>{return <CartItem key={cartItem.id} item={cartItem} 
                qtyIncrease={qtyIncrease}
                qtyDecrease={qtyDecrease}
                qtyReset={qtyReset}
                removeItem={removeItem}/>})}
            </div>
        </React.Fragment>
        
    );
}

export default Cart;