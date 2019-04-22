import React, {Component} from 'react'
import {getCartThunk, removeItemThunk} from '../store/cart'
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    cart: state.cart.cart
  }
}

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCartThunk()),
  removeItem: product => dispatch(removeItemThunk(product))
})

class Cart extends Component {
  constructor() {
    super()
//this.addTotal = this.addTotal.bind(this)
    }  
  componentDidMount() {
    this.props.getCart()
  }

  // addTotal() {
  //   totalPrice = this.props.cart.map(product => {return product.price}).reduce ((x,y)=>x+y)
  //   return totalPrice
  // }

  renderItems() {

   // const totalPrice = this.props.cart.map(product => {return product.price}).reduce ((x,y)=>x+y)
  
   
    // LOOK AT client/store/cart.js re: the reasoning for cart.cart
    if (this.props.cart && this.props.cart.length > 0) {
      const totalPrice = this.props.cart.map(product => {return product.price}).reduce
       ((x,y)=> Number(x)+ Number(y))
   
      return (
   
        <div className="cart-container">
          <div className="cart-header">
            <div className="cart-header-product-name">Item</div>
            <div className="cart-column-product-quantity">Quantity</div>
            <div className="cart-column-product-price">Price</div>
            <div className="cart-column-product-remove">Remove</div>
          </div>
          {this.props.cart.map(product => {
            return (
              <div className="cart-row" key={product.id}>
                <div className="cart-column-product-name">
                  <a href={`/products/${product.id}`}>{product.name}</a>
                </div>
                <div className="cart-column-product-quantity">
                  <button>
                    <i className="far fa-minus-square" />
                  </button>1
                  <button>
                    <i className="far fa-plus-square" />
                  </button>
                
                </div>
                <div className="cart-column-product-price">
                  ${product.price}
                </div>
                <div className="cart-column-product-remove">
                <button onClick={() => this.props.removeItem(product.id)}>
                    <i className="far fa-trash-alt" />
                  </button>
                  </div>
              </div>
            )
          })}
           <div  id="total" >TOTAL: ${totalPrice} </div>
          <div id='checkOut'><button>Check Out</button></div>
        </div>
        
      )
    } else {
      return <div className='container'><br /> <br />Your Cart Is Currently Empty</div>
    }
  }

  render() {
   // const totalPrice = this.props.cart.map(product => {return product.price}).reduce ((x,y)=>x+y)
  
    return (
      
      <div>

        <h1 id='cartHeader'>Your Cart</h1>
        {this.renderItems()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
