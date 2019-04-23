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
  constructor(props) {
    super(props)

    this.guestRemoveItem = this.guestRemoveItem.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
    this.props.cartTotal()
  }

  componentDidUpdate() {
    this.props.cartTotal()
  }

  guestRemoveItem(id) {
    let currentGuestCart = JSON.parse(localStorage.getItem('cart'))
    localStorage.setItem(
      'cart',
      JSON.stringify(
        currentGuestCart.filter(product => {
          return product.id !== id
        })
      )
    )
    this.props.getCart()
  }

  render() {
    let cart = this.props.cart
    const {isLoggedIn} = this.props
    if (!isLoggedIn) {
      cart = JSON.parse(localStorage.getItem('cart'))
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
                      placeholder="1"
                    />
                    {/* <button>Update</button> */}
                    <button
                      onClick={
                        isLoggedIn
                          ? () => this.props.removeItem(product.id)
                          : () => this.guestRemoveItem(product.id)
                      }
                    >
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
            <button onClick={() => checkOut()}>Check Out</button>
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
  cartTotal: () => dispatch(cartTotalThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
