import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../components/redux/Products/ProductsAction';
import { Link } from 'react-router-dom';

const GetTableData = ({render}) => {
 
const rowData = useSelector(state => state.product.products)
console.log(rowData)
   const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(fetchProducts())
    },[])

console.log("in ag grid")
    const columnStyle = useMemo(()=>{
        return{
            flex:5,
            editable:true,
            filter:true,
            floatingFilter:true,
        }
    })
// '/userdetails'
    const CellData = (p)=>(  
             <Link  to={`/userdetails/${p.data.id}`}>
                  {p.value}
            </Link>)
     
    const [ colDefs,setColDefs ] = useState([
        {  field:"username",
            valueFormatter: p =>p.value.toUpperCase(),
             cellRenderer :CellData,
        },
        {  field:"name"},
        {  field:"email"},
        {  field:"phone" },
        {  field:"website",
            headerName:"Employer Website"
        },
         ])


         return render(rowData,colDefs,columnStyle)
}

export default GetTableData