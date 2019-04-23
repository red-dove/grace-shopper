import axios from 'axios'

const initialState = {
  cart: [],
  cartTotal: 0
}

const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
const CART_TOTAL = 'CART_TOTAL'


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

const updateItemQuantity = (id, num) => ({
  type: UPDATE_ITEM_QUANTITY,
  id,
  num
})
const cartTotal = total => ({
  type: CART_TOTAL,
  total
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

export const updateItemQuantityThunk = (id, num) => {
  return async dispatch => {
    try {
      if (num === 0) {
        await axios.delete('/api/users/cart/' + id)
        dispatch(removeItem(id))
      } else {
        await axios.put('/api/users/cart/' + id, num)
        dispatch(updateItemQuantity(id, num))
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const cartTotalThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/cart`)
      let result = data
        .map(product => {
          return product.price
        })
        .reduce((x, y) => x + y)
      let newResult = (result / 100).toFixed(2)
      dispatch(cartTotal(newResult))
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
    case CART_TOTAL:
      return {...state, cartTotal: action.total}
    // case UPDATE_ITEM_QUANTITY:
    //   cart = state.cart.map(elem => {
    //      return { ...elem, quantity: action.num };
    //  });
    //  return { ...state, cart };
    default:
      return state
  }
}
