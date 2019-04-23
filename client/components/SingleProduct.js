import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk, addToCartThunk} from '../store'

class SingleProduct extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getProduct()
  }

  handleSubmit(event) {
    event.preventDefault()

    const {isLoggedIn} = this.props
    const product = this.props.data.id
    const guestCart = localStorage.getItem('cart')
    const newCartItem = {id: product, quantity: 1}

    if (!isLoggedIn && !guestCart) {
      localStorage.setItem('cart', JSON.stringify([newCartItem]))
    } else if (!isLoggedIn && guestCart) {
      let parsedCartArray = JSON.parse(guestCart)
      let itemExists = false

      for (let i = 0; i < parsedCartArray.length; i++) {
        if (parsedCartArray[i].id === product) {
          parsedCartArray[i].quantity++
          itemExists = true
          break
        }
      }

      if (!itemExists) parsedCartArray.push(newCartItem)
      localStorage.setItem('cart', JSON.stringify(parsedCartArray))
    } else {
      this.props.addToCart(product)
    }
  }

  render() {
    let product = this.props.data
    return (
      <div className="container">
        <div className="containerSingle">
          <div>
            {' '}
            <img src={product.imageUrl} />{' '}
          </div>
          <div id="nameStyle">{product.name}</div>
          <div id="priceStyle">${product.price}</div>
          <div>
            <button type="submit" onClick={this.handleSubmit}>
              Add to Cart
            </button>
          </div>
        </div>

        <div className="desc">{product.description} </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  //console.log('mapping state to store!!!', state.products.singleProduct)
  return {
    data: state.products.singleProduct,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = (dispatch, id) => {
  return {
    getProduct: () => {
      const productId = id.match.params.productId
      dispatch(getSingleProductThunk(productId))
    },
    addToCart: product => dispatch(addToCartThunk(product))
  }
}

const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
)
export default SingleProductContainer
