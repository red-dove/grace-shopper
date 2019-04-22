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
    const product = this.props.data.id
    const {isLoggedIn} = this.props
    const guestCart = localStorage.getItem('cart')
    if (!isLoggedIn && !guestCart) {
      console.log('not logged in, no guest cart')
      localStorage.setItem('cart', `[{id: ${product}, quantity: 1}]`)
    } else if (!isLoggedIn && guestCart) {
      console.log('not logged in, HAS guest cart')
      let array = JSON.parse(guestCart)
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === product) {
          array[i].quantity = array[i].quantity + 1
          break
        } else {
          array.push({id: product, quantity: 1})
        }
      }
      localStorage.setItem('cart', JSON.stringify(array))
    } else {
      console.log('LOGGED IN')
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
