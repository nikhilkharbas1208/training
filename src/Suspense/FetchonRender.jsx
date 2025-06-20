import React, { useEffect, useState } from 'react'

 
const FetchonRender = () => {
    const [data , setData]=useState([]);
    const [loading , setLoading] = useState(true);
 
    const fetchingData = async () => {
         fetch('https://jsonplaceholder.typicode.com/albums')
        .then(res => res.json())
        .then(json => {
            setData(json)
            setLoading(false);
            console.log(json)});  
    }

  

    
    useEffect(()=>{
      setTimeout(() => {
        fetchingData() 
    }, 3000);
    },[]);
  return (
   
    <div>
        <h1> FetchonRender </h1>
       <div>  { (loading) ? <p> is Loading.....</p> : <p></p>}</div>
        <ul>
           {
             data.map((fdata)=>(
                <div key={fdata.id}>
                   
                    <li>UserId is: {fdata.userId}</li>
                    <li>Title is: {fdata.title}</li>
                   
                    <br></br>
                </div>
             ))        
           }
         </ul>
    </div>
  )
}

export default FetchonRender