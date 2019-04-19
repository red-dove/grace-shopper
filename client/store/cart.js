import axios from 'axios'

const initialState = {
  cart: []
}

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'

const getCart = products => {
  return {
    type: GET_CART,
    products
  }
}

const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

const removeItem = id => ({
  type: REMOVE_ITEM,
  id
})

export const addToCartThunk = product => {
  return async dispatch => {
    try {
      const res = await axios.post(`/api/products/${product}`, product)
      dispatch(addToCart(res.data))
    } catch (err) {
      console.log('ERROR', err)
    }
  }
}

export const getCartThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/cart`)
      data.map(product => (product.price = (product.price / 100).toFixed(2)))
      dispatch(getCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeItemThunk = id => {
  return async dispatch => {
    try {
      await axios.delete('/api/users/cart/' + id)
      dispatch(removeItem(id))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.product]}
    case GET_CART:
      return {...state, cart: action.products}
    case REMOVE_ITEM:
      return {
        ...state,
        cart: [...state.cart].filter(product => {
          return product.id !== action.id
        })
      }
    default:
      return state
  }
}
