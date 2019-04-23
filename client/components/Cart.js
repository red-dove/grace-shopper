import React, {Component} from 'react'
import {
  getCartThunk,
  removeItemThunk,
  updateItemQuantityThunk
} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends Component {
  constructor(props) {
    super(props)

    this.guestRemoveItem = this.guestRemoveItem.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  guestRemoveItem(id) {
    console.log('GUEST REMOVE')
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
                      placeholder={product.quantity}
                    />
                    <button
                      onClick={() => this.props.updateItemQuantity(product.id)}
                    >
                      Update
                    </button>
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
          <div id="total">TOTAL: ${0} </div>
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
}

const mapStateToProps = state => {
  return {
    cart: state.cart.cart,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCartThunk()),
  removeItem: id => dispatch(removeItemThunk(id)),
  // updateItemQuantity: (id, num) => dispatch(updateItemQuantityThunk(id, num))
  updateItemQuantity: id => {
    console.log(id)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
