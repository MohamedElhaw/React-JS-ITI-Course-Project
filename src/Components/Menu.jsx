import react from "react";

import Meal from "./Meal";
import "./Menu.css"

function Menu (props){
  console.log(props);
    return(
        <table className="table table-m-1">
          <thead>
            <tr>
              <th scope="col">Menu</th>
              <th className="txt-c" scope="col">Price</th>
              <th className="txt-c" scope="col">Add to cart </th>
            </tr>
          </thead>
          <tbody>
            {props.products.map(product=><Meal key={product.id} product={product} addToCart={props.addToCart} />)}
          </tbody>
        </table>
    )
}

export default Menu;