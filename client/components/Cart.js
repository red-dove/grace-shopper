import React, {Component} from 'react'
import {
  getCartThunk,
  removeItemThunk,
  // updateItemQuantityThunk,
  cartTotalThunk
  // addToCartGuestThunk
} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Cart extends Component {
  constructor(props) {
    super(props)

    this.guestRemoveItem = this.guestRemoveItem.bind(this)
    this.checkOut = this.checkOut.bind(this)
    // this.routeChange = this.routeChange.bind(this)
  }
  // routeChange() {
  //   let path = '/signup'
  //   this.props.history.push(path)
  // }

  componentDidMount() {
    this.props.getCart()
    this.props.cartTotal()
    // this.props.removeItem()
    // this.props.addtoCartGuest()
  }
  componentDidUpdate() {
    this.props.cartTotal()
  }

  guestTotal() {
    let currentGuestCart = JSON.parse(localStorage.getItem('cart'))
    return currentGuestCart
      .map(product => {
        return product.price
      })
      .reduce((x, y) => x + y)
      .toFixed(2)
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

    this.forceUpdate()
  }

  async checkOut() {
    const {isLoggedIn} = this.props
    if (!isLoggedIn) {
      let guestCart = JSON.parse(localStorage.getItem('cart'))
      await axios.post('/api/users/cart/checkout', guestCart)
      localStorage.removeItem('cart')
    } else {
      await axios.put('/api/users/cart/checkout')
    }

    this.props.history.push('/thankyou')
  }

  render() {
    let cart = this.props.cart
    const {isLoggedIn} = this.props
    if (!isLoggedIn) {
      cart = JSON.parse(localStorage.getItem('cart'))
      // if (JSON.parse(localStorage.getItem('cart'))) {
      //   cart = JSON.parse(localStorage.getItem('cart'))
      // }
    }

    if (cart && cart.length > 0) {
      return (
        <div className="cart-container">
          <h1>Your Cart</h1>
          <div className="cart-table">
            <div className="cart-table-row">
              <div className="cart-table-cell-50">
                <h2>Item</h2>
              </div>
              <div className="cart-table-cell-25">
                <h2>Quantity</h2>
              </div>
              <div className="cart-table-cell-25">
                <h2>Price</h2>
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
                    <button>Update</button>
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
          <div className="cart-table-row">
            <div className="cart-table-cell-50" />
            <div className="cart-table-cell-25">TOTAL</div>
            <div className="cart-table-cell-25">
              ${isLoggedIn ? this.props.total : this.guestTotal()}
            </div>
          </div>

          <div id="checkOut">
            <button onClick={() => this.checkOut()}>Check Out</button>
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

  // updateItemQuantity: (id, num) => {
  //   dispatch(updateItemQuantityThunk(id, num))
  // },
  // cartTotal: () => dispatch(cartTotalThunk()),
  // updateItemQuantity: id => {
  //   console.log(id)
  // },
  // addtoCartGuest: () => dispatch(addToCartGuestThunk()),
  cartTotal: () => dispatch(cartTotalThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
