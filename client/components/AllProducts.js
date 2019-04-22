import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllProductsThunk} from '../store'

class AllProducts extends Component {
  constructor() {
    super()

    }  

    componentDidMount() { 
        this.props.getAllProductsThunk()
     }

    render() {
        return (
<div><h1>Our Products</h1>
     <div className='container'> 
     
            {this.props.data.map(product => {
            return (
              <div  className='container-child' key={product.id} >
                  <div  > <Link to ={`/products/${product.id}`}   > <img src={product.imageUrl}  /> </Link> </div>
               
                     <Link to ={`/products/${product.id}`}   >
                     <div key={product.id}><h5>{product.name}</h5></div>
                     </Link>
                     <div>${product.price}</div>
                     </div>
           
            )            
            })}     
          </div>    
          </div>
        )
     }   
}
const  mapStateToProps= (state)=> {  
//  console.log('mapping state to store', state.products.allProducts)
      return { data: state.products.allProducts } 
  }
  


const mapDispatchToProps =  (dispatch) => {
    return {
      getAllProductsThunk:  ()=> {
        dispatch(getAllProductsThunk())
      },


    };
  };

const AllProductsContainer = connect(mapStateToProps,mapDispatchToProps)(AllProducts);
export default  AllProductsContainer
  
