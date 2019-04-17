import axios from 'axios'

const GET_CART = 'GET_CART'

const gotCart = data => {
  return {
    type: GET_CART,
    payload: data
  }
}

export const getCart = () => {}

const initiaState = {
  cart: []
}
