import React, {Component} from 'react'
import {getCartThunk} from '../store/cart'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getCartThunk: () => dispatch(getCartThunk())
})

class Cart extends Component {
  componentDidMount() {
    this.props.getCartThunk()
    console.log('COMPONENT MOUNT?')
  }

  render() {
    return (
      <div>
        <h1>OUR CART</h1>
        <ul>
          {/* {this.props.cart.map(item => {
            return <li>{item.id}</li>
          })} */}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
