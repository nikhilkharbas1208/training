import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
 import  {ordered, restocked}   from '../Features/CakeSlice';
import { fetchUsers } from '../Features/UserSlice';


const CakeShop = () => {

    const cakeAvailable = useSelector(state => state.cake.numOfCakes)
    const customers = useSelector(state=>state.user)
    const dispatch = useDispatch();

  return (
    <div>
        <h3>CakeShop</h3><br/><br/>
        <p>Cake available -- {cakeAvailable}</p><br/>
        <button onClick={()=>{dispatch(ordered())}}>order cake</button>
        <button onClick={()=>{dispatch(restocked(3))}}>restock cake</button>
        <br/><br/>
        <p>no of cutomers are --<ul> {customers.users.map((user)=>(
            <li key={user.id}>{user.name}</li>
        ))}</ul></p>
        <button onClick={()=>{dispatch(fetchUsers())}}>customers data</button>
    </div>
  )
}

export default CakeShop