import axios from 'axios'

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCT = 'GET_PRODUCT'



const initialState ={
    allProducts: [],
    singleProduct:{}
  }
  
 const  receiveProducts = (products) => (
    { 
      type:GET_PRODUCTS,
      allProducts: products, 
     })
 
     

export const  receiveProduct = (product) => (
        { 
          type:GET_PRODUCT,
          singleProduct: product, 
         })

export const getAllProductsThunk = () => {
  return async dispatch => {
        try {
          const {data}= await axios.get('/api/products')
          data.map(product => product.price = (product.price/100).toFixed(2))
          dispatch(receiveProducts(data))  
        } catch (err) {
          console.log("Error fetching products")
        }
      }
}

export const getSingleProductThunk = (productId) => {
    return async dispatch => {
      try {
        const { data } = await axios.get('/api/products/'+ productId)
        data.price = (data.price/100).toFixed(2)
        dispatch(receiveProduct(data))
   
      } catch (err) {
        console.log("Error fetching product")
      }
    }
  } 
export default function(state = initialState, action) {
switch (action.type) {
    case GET_PRODUCTS:
    return {...state, allProducts: action.allProducts}
    case GET_PRODUCT:
    return  {...state, singleProduct: action.singleProduct}
    default:
    return state
}
}

