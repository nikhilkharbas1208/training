import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './redux/Products/ProductsAction';
 import DemoTable from '../AgGrid/DemoTable';



const ProductsData = () => {

   const data = useSelector(state => state.product.products)
   const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(fetchProducts())
    },[])
    
    
    let display;
       console.log("the data is:")
       console.log(data)
        
      
  return (
    <div>
        <h2>ProductsData</h2>
         {/* <DemoTable value={{data}}/> */}
       {data.map(user => (
  <div key={user.id}>
    <h4>{user.name}</h4>
    <p>Username: {user.username}</p>
    <p>Email: {user.email}</p>
    <hr />
  </div>
))}
    </div>
  )
}

 export default ProductsData