import react from "react";
import "./Meal.css";

function Meal (props){
  const {id,item,price}=props.product;
  let cart=<i className="fas fa-cart-arrow-down font-c"></i>;
return(
    <tr key={id}>
      <td>{item}</td>
      <td className="txt-c">{price}</td>
      <td className="txt-c"><button className="btn-1" onClick={()=>{props.addToCart(id)}}>{cart}</button></td>
    </tr>
)
}
export default Meal;