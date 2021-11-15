import react from "react";
import "./CartItem.css"

function CartItem (probs){
    const {id, item, qty}=probs.item;
    const {qtyIncrease, qtyDecrease, qtyReset,removeItem}=probs;
    let qtyElementFn=(qty)=>{
        let qtyElement=qty===0? <div className="bkg qtybox">{qty}</div>:<div className="qtybox border-b">{qty}</div>
        return qtyElement;
    }
    
    return(
        <div  key={id} className="row-container">
                <div className="item-name">{item}</div>
                {qtyElementFn(qty)}
                <div className="btns">
                    <button type="button" className="btn btn-primary m-1" onClick={()=>qtyIncrease(id)}>+</button>
                    <button type="button" className="btn btn-primary m-1"onClick={()=>{qtyDecrease(id)}}>-</button>
                    <button type="Reset" className="btn btn-warning m-1"onClick={()=>{qtyReset(id)}}>Reset</button>
                    <button type="button" className="btn btn-danger m-1" onClick={()=>{removeItem(id)}}>Remove</button>
                </div>
            </div>
        
    );
}
export default CartItem;