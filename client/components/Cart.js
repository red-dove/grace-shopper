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

class Cart extends Component {
  constructor() {
    super()

    this.handleChange = this.handleChange.bind(this)
    this.checkOut = this.checkOut.bind(this)
    this.routeChange = this.routeChange.bind(this)
  }
  routeChange() {
    let path = '/signup'
    this.props.history.push(path)
  }
  componentDidMount() {
    const {isLoggedIn} = this.props
    this.props.getCart()
    this.props.cartTotal()
    this.props.removeItem()
  }
  componentDidUpdate() {
    this.props.cartTotal()

  }

  handleChange(event) {
    this.props.updateItemQuantity(id, event.target.value)
  }

 async  checkOut() {
  const {isLoggedIn} = this.props
  if (!isLoggedIn) {
    alert('You must sign up in order to checkout!')
    // localStorage.setItem('cart', JSON.stringify([]))
    this.routeChange()
  }
    await axios.put('/api/users/cart/checkout')
   this.props.getCart()
  }

  render() {
    let cart = this.props.cart
    const {isLoggedIn} = this.props
    if (!isLoggedIn) {
      //console.log('Cart not logged in')
      cart = JSON.parse(localStorage.getItem('cart'))
      if (JSON.parse(localStorage.getItem('cart'))) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
    }

    if (cart && cart.length > 0) {
      return (
        <div className="cart-container">
          <h1>Your Cart</h1>
          <div className="cart-table">
            <div className="cart-table-row">
              <div className="cart-table-cell-50">
                <h3>Item</h3>
              </div>
              <div className="cart-table-cell-25">
                <h3>Quantity</h3>
              </div>
              <div className="cart-table-cell-25">
                <h3>Price</h3>
              </div>
            </div>
            {cart.map(product => {
              return (
                <div className="cart-table-row" key={product.id}>
                  <div className="cart-table-cell-50">
                    <Link
                      to={`/products/${product.id}`}
                      className="cart-table-link"
                    >
                      <img
                        src={product.imageUrl}
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
                      placeholder={product.quantity}
                    />
                    <button>Update</button>
                    <button onClick={() => this.props.removeItem(product.id)}>
                      Remove
                    </button>
                  </div>
                  <div className="cart-table-cell-25">${product.price}</div>
                </div>
              )
            })}
          </div>

          <div id="total">TOTAL: ${this.props.total}</div>

          <div id="checkOut">
            <button onClick={this.checkOut}>
              Check Out
            </button>
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
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    total: state.cart.cartTotal,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCartThunk()),
  removeItem: id => dispatch(removeItemThunk(id)),

  updateItemQuantity: (id, num) => {
    dispatch(updateItemQuantityThunk(id, num))
  },
  cartTotal: () => dispatch(cartTotalThunk()),
  updateItemQuantity: id => {
    console.log(id)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
