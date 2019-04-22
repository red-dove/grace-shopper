import React, {Component} from 'react'
import {
  getCartThunk,
  removeItemThunk,
  updateItemQuantityThunk
} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const mapStateToProps = state => {
  return {
    cart: state.cart.cart
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

class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  renderItems() {
    if (this.props.cart && this.props.cart.length > 0) {
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
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </div>
                  <div className="cart-table-cell-25">
                    <input
                      name="quantity"
                      type="number"
                      min="0"
                      placeholder="1"
                    />
                    <button
                      onClick={() => this.props.updateItemQuantity(product.id)}
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
        </div>
      )
    } else {
      return <p>NO ITEMS IN CART</p>
    }
  }

  render() {
    return <div>{this.renderItems()}</div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
