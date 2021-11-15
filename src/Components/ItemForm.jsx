import React,{Component} from "react";
import Joi, { errors } from "joi-browser";
import axios from "axios";

import "./ItemForm.css"

class ItemForm extends Component{
    state={
        item:"",
        price:"",
        errors:{}
    };
    async componentDidMount(){
        if(this.props.location.pathname.slice(0,6)==="/New/:"){
            const id=this.props.location.pathname.slice(6);
            const {data}= await axios.get(`http://localhost:3000/products/${id}`);
            const {item,price}=data;
            this.setState({item,price});
        }
    }
    submit=(e)=>{
        e.preventDefault();
        const valid=this.validate();
        if (this.props.location.pathname==="/New"){
            if (valid){
                const {item,price} =this.state;
                 this.send(item, price);
                 console.log("submited",e,this.state)
                 alert("Item submitted successfully");
             } 
             else{
                 console.log("Error",this.state.errors)
             } 
        }
        else if(this.props.location.pathname.slice(0,6)==="/New/:"){
            if (valid){
                const id=this.props.location.pathname.slice(6);
                this.update(id);
                alert("Item saved successfully");
            }
            else{
                console.log("Error",this.state.errors)
            }     
    }
}
    send=async (item,price)=>{
    const id= Math.random;
    await axios.post('http://localhost:3000/products',{id,item, price});
    this.props.update();
    }
    update=async id=>{
        const {item,price}=this.state;
        await axios.put(`http://localhost:3000/products/${id}`,{id,item, price});
        this.props.update();
    }
    /*Define schema for validation*/
    schema={
        item:Joi.string().required(),
        price:Joi.number().min(0).required()
    }
    validate=()=>{
    const state={...this.state};
    delete state.errors;
    let res=Joi.validate(state, this.schema,{abortEarly:false});
    let errors={};
    if(res.error===null) return true;
    else{
        
        res.error.details.map(err=>{
            errors[err.path]= err.message;
        });
        this.setState({errors});
        
        return false;
    }
    }
    handleChange=e=>{
        let state={...this.state}
        state[e.currentTarget.name]=e.currentTarget.value;
        this.setState(state);
        console.log(state);
    }
    pageTitle=()=>{
        if(this.props.location.pathname==="/New") return "Add new product:";
        else if(this.props.location.pathname.slice(0,6)==="/New/:") return "Edit product"
    }
    render(){
        console.log(this.props.location);
        
        return(
            <React.Fragment>
                <h4 className="new-product-pg-title">{this.pageTitle()}</h4>
                <form onSubmit={this.submit}>
                   <label htmlFor="product">Product:</label>
                    <input type="text" id="product" name="item" value={this.state.item} onChange={this.handleChange}/>
                    {this.state.errors.item&&(<div className="error" role="alert">{this.state.errors.item}</div>)}
                    <label htmlFor="price">Price:</label>
                    <input type="text" id="price" name="price"value={this.state.price} onChange={this.handleChange}/>
                    {this.state.errors.price&&(<div className="error" role="alert">{this.state.errors.price}</div>)}
                    <input className="btn-primary" id="btn-submit"type="submit"/>
                 </form>
            </React.Fragment>
        );
        }
}

export default ItemForm;