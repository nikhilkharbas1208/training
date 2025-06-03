import { useEffect, useState } from "react";
import Fetchdata from './Fetchdata';
const resource = Fetchdata('https://jsonplaceholder.typicode.com/todos');
export const Todos =  () => {
    
    // const [data,setData]=useState([]);

     
     const data = resource.read();

    return (
       
        <div>
            
           {
             data.map((fd)=>(
                <ul key={fd.id}>
                    <li>status : {fd.completed}</li>
                    <li>userid : {fd.userId}</li>
                    <li>title : {fd.title}</li>
                </ul>
            ))
           }
        </div>
    );

}
