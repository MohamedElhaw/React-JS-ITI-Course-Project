import React from "react";
import react,{Component} from "react";
import "./Admin.css";


class Admin extends Component{
state={};


render(){
    return(
        <react.Fragment>
            <h3 className="Admin-pg-title">Admin page</h3>
            <button className="btn btn-primary btn-margin" onClick={()=>{this.props.history.push("/New")}}>Add New</button>

            <table className="table table-m-1">
                <thead>
                    <tr>
                    <th scope="col">Menu</th>
                    <th className="txt-c" scope="col">Price</th>
                    <th className="txt-c" scope="col">Edit</th>
                    <th className="txt-c" scope="col">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.products.map(product=>{ return(<tr key={product.id}>
                        <td>{product.item}</td>
                        <td className="txt-c">{product.price}</td>
                        <td className="txt-c"><button className="btn-1 edit" onClick={()=>{this.props.history.push(`/New/:${product.id}`)}}><i className="fas fa-edit"></i></button></td>
                        <td className="txt-c"><button className="btn-1 remove" onClick={()=>this.props.deleteItem(product.id)}><i className="fas fa-minus-circle"></i></button></td>
                      </tr>);
                        
                    })}
                </tbody>
            </table>
        </react.Fragment>
    );
 }
   
}
        

export default Admin;