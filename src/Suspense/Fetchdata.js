import React, { useState } from 'react'
import WrapPromise from './WrapPromise'

const Fetchdata = (url) => {

  const promise = fetch(url)
    .then((res) => res.json());
   
     return WrapPromise(promise);
  
    //const [data , setData]=useState([]);
    
    // const promise = fetch(url)
    // .then(res => res.json())
    // .then((json) =>json);

     
}

export default Fetchdata