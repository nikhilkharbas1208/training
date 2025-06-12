import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserDetails = () => {

    const udata = useSelector(state=>state.product.products)
     console.log(udata)
    
   const {id}= useParams()
    const userId = id
    //  console.log(userId)
    const filterData = udata.filter(p=>(p.id)===parseInt(userId))
    const data = filterData[0]
  return (
        <div  style={{
                maxWidth: '500px',
                margin: '20px auto',
                padding: '20px',}}
        >
             <h2>UserDetails--{userId}</h2>
             <div>
                <ul>
                    <li>{ data.id}</li>
                    <li>{data.name}</li>
                    <li>{data.username}</li>
                    <li>{data.email}</li>
                </ul>
              </div>
        </div>
   
  )
}

export default UserDetails

