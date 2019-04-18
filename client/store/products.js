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
    
  // export const addToCart = (product) => (
  //   {
  //     type:GET_PRODUCTS,
  //     carProduct: product, 
  //   }
  // )

  // export const postProduct = (product) => {
  //   return async (dispatch) => {
  //    try {
  //     const res = await axios.post('/api/', product);
  //     dispatch( addToCart(res.data))
  //    } 
  //    catch (err) {
    
  //   }
  //   }
  // }

export const getAllProductsThunk = () => {
        return async dispatch => {
             try {
               const res= await axios.get('/api/products')
               dispatch(receiveProducts(res.data))  
             } catch (err) {
               console.log("Error fetching products")
             }
           }
}

export const getSingleProductThunk = (productId) => {
    return async dispatch => {
      try {
        const { data } = await axios.get('/api/products/'+ productId)
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

