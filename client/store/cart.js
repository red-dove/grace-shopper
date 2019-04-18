import axios from 'axios'

const initialState = {
    cart: [],
    
  }
  
const ADD_TO_CART = 'ADD_TO_CART'

const addToCart = (product) => (
    { 
      type: ADD_TO_CART, 
      product 
    }); 

export const addToCartThunk = (product) => {
      return async (dispatch) => {
        try {
            const res = await axios.post(`/api/products/${product}`, product);
            dispatch( addToCart(res.data))
            } 
            catch (err) {
            console.log('ERROR', err)
          }
      };
    };


// export const addToCartThunk = (product) => {
//   return dispatch => {
//     const action = addToCart(product);
//     dispatch(action);
//   };
// };

    export default function(state = initialState, action) {
        switch (action.type) {
            case ADD_TO_CART:
            return { ...state, cart: [...state.cart, action.product] };
            default:
            return state
        }
        }
        