import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './redux/Products/ProductsAction';

const ProductsData = () => {
   const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(fetchProducts())
    },[])
    const data = useSelector(state => state.product)
    console.log("the data is:"+data.products)
    
  return (
    <div>
        <h2>ProductsData</h2>
        <div>{data.products.map(title=><p>{title}</p>)}</div>
    </div>
  )
}

export default ProductsData