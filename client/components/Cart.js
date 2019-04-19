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
  componentDidMount() {
    this.props.getCart()
  }

  renderItems() {
    // LOOK AT client/store/cart.js re: the reasoning for cart.cart
    if (this.props.cart && this.props.cart.length > 0) {
      return (
        // <ul>
        // {this.props.cart.cart.map(item => {
        //   return <li>{item.id}</li>
        // })}
        // </ul>
        <div className="cart-container">
          <div className="cart-header">
            <div className="cart-header-product-name">Item</div>
            <div className="cart-column-product-quantity">Quantity</div>
            <div className="cart-column-product-price">Price</div>
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
                  <button onClick={() => this.props.removeItem(product.id)}>
                    <i className="far fa-trash-alt" /> Remove
                  </button>
                </div>
                <div className="cart-column-product-price">
                  ${product.price}
                </div>
              </div>
            )
          })}
        </div>
      )
    } else {
      return <p>NO ITEMS IN CART</p>
    }
  }

  render() {
    return (
      <div>
        <h1>Your Cart</h1>
        {this.renderItems()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)