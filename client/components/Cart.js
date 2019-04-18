import React, {Component} from 'react'
import {getCartThunk} from '../store/cart'
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCartThunk())
})

class Cart extends Component {
  componentDidMount() {
    this.props.getCart()
  }

  renderItems() {
    // LOOK AT client/store/cart.js re: the reasoning for cart.cart
    if (this.props.cart.cart && this.props.cart.cart.length > 0) {
      return (
        // <ul>
        // {this.props.cart.cart.map(item => {
        //   return <li>{item.id}</li>
        // })}
        // </ul>
        <div className="cart-container">
          <div className="cart-header">
            {/* table headers needed here */}
            {this.props.cart.cart.map(product => {
              return (
                <div className="cart-row" key={product.id}>
                  <a href={`/products/${product.id}`}>{product.name}</a>,{
                    product.price
                  }
                </div>
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
    return (
      <div>
        <h1>Your Cart</h1>
        {this.renderItems()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
