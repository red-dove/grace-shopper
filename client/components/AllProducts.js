 
import React, {Component} from 'react'
import { connect } from 'react-redux';
import {Link } from  'react-router-dom'
import {getAllProductsThunk} from '../store'

class AllProducts extends Component {
    constructor () {
    super()
    }

    // componentDidMount() {
    //     this.props.onLoadProducts()
    //  }

    render() {
        return (

            <div >
            {this.props.allProducts.map(product => {
            return (
              <div    key={product.id} >
                  <div> <img src={product.imageUrl}  /> </div>
                     <Link to ={`/products/${product.id}`}   >
                     <div key={product.id}>{product.name}</div>
                     </Link>  
                     <div>{product.price}</div>
                </div>
            )            
            })}     
         
    </div>  
        )
     }   
}
const  mapStateToProps= (state)=> {  
      return { allProducts: state.allProducts } 
  }
  


// const mapDispatchToProps =  (dispatch) => {
//     return {
//         onLoadProducts:  ()=> {
//         dispatch(getAllProductsThunk())
//       },


//     };
//   };

const AllProductsContainer = connect(mapStateToProps, mapDispatchToProps)(AllProducts);
export default AllProductsContainer;
  