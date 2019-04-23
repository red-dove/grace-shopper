import React, {Component} from 'react'
import {
  getCartThunk,
  removeItemThunk,
  updateItemQuantityThunk,
  cartTotalThunk
} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {DH_CHECK_P_NOT_SAFE_PRIME} from 'constants'



class Cart extends Component {
  constructor() {
    super()
    // this.state = {
    //   total:this.state.cartTotal
    // }
    this.handleChange = this.handleChange.bind(this);
  }
   componentDidMount() {
    this.props.getCart()
   this.props.cartTotal()

  //   const res = await axios.get('/api/users/cart/quantity')
  //   console.log(res.data)
  //  // this.setState({quantityObj: res.data})

    // this.setState
  }

  handleChange(event) {
    this.props.updateItemQuantity( id,  event.target.value )
  
  }

   renderItems() {
   // console.log('CART TOTAL!!', this.props.total)

    if (this.props.cart && this.props.cart.length > 0) {
      

        // const itemsInCart =  this.state.quantityObj.map(item => {
        
        // })
        // console.log('!!!!!!!', this.state.quantityObj)

 
  
      return (
        <div className="cart-container">
          <h1>Your Cart</h1>
          <div className="cart-table">
            <div className="cart-table-cell-50">
              <h3>Item</h3>
            </div>
            <div className="cart-table-cell-25">
              <h3>Quantity</h3>
            </div>
            <div className="cart-table-cell-25">
              <h3>Price</h3>
            </div>
            {this.props.cart.map(product => {
              return (
                <>
                  <div className="cart-table-cell-50">
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={`${product.imageUrl}`}
                        className="cart-table-product-img"
                      />
                      {product.name}
                    </Link>
                  </div>
                  <div className="cart-table-cell-25">
                    <input
                      name="quantity"
                      type="number"
                      min="0"
                      placeholder="1"
                      // value={this.state.quantity}
                      //  onChange={this.handleChange}
                    />
                    <button
                      // onClick={() =>
                      //   this.props.updateItemQuantity(
                      //     product.id,
                      //     this.state.quantity
                      //   )
                      // }
                    >
                      Update
                    </button>
                    <button onClick={() => this.props.removeItem(product.id)}>
                      Remove
                    </button>
                  </div>
                  <div className="cart-table-cell-25">${product.price}</div>
                </>
              )
            })}
          </div>


          <div id="total">TOTAL: ${ this.props.total}</div>


          <div id="checkOut">
            <button>Check Out</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="container">
          <br /> <br />Your Cart Is Currently Empty
        </div>
      )
    }
  }

  render() {
    return <div>{this.renderItems()}</div>
  }
}
const mapStateToProps = state => {
 console.log('!!!!!', state.cart.cartTotal)
  return {
    cart: state.cart.cart,
    total: state.cart.cartTotal,
  }
}

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCartThunk()),
  removeItem: id => dispatch(removeItemThunk(id)),

  updateItemQuantity: (id, num) => {
    dispatch(updateItemQuantityThunk(id, num))
  },
  cartTotal: () => dispatch(cartTotalThunk())
})
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
