 
import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Link } from  'react-router-dom'
import {getSingleProductThunk, addToCartThunk} from '../store'


class SingleProduct extends Component {
    constructor() {
        super ()

        this.handleSubmit = this.handleSubmit.bind(this);
      }
      componentDidMount() { 
        this.props.getProduct()

     }

     handleSubmit(event) {
      event.preventDefault();
      const product = this.props.data.id;
      this.props.addToCart(product);
 
    }
  
    render() {
    let product = this.props.data
        return ( 

             <div  >
                  <div> <img src={product.imageUrl}  /> </div>    
                  <div>{product.description}  </div>      
                     <div >{product.name}</div>
                     <div>{product.price}</div>
                     <div>{product.quantity}</div>
                     <div><button type="submit" onClick={this.handleSubmit}>Add to Cart</button></div>
                </div>

               

        )
     }   
}


const  mapStateToProps= (state)=> {  
  //console.log('mapping state to store!!!', state.products.singleProduct)
      return { data: state.products.singleProduct } 
  }
  
  const mapDispatchToProps =  (dispatch, id) => {
    return {
      getProduct:  ()=> {
        const productId = id.match.params.productId;
        dispatch(getSingleProductThunk(productId)) 
      },
      addToCart: (product) =>
      dispatch(addToCartThunk(product)),

    };
  };




const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
export default  SingleProductContainer
  