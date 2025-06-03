import { useEffect, useState } from "react";
import Fetchdata from "./Fetchdata";
 const resource = Fetchdata('https://jsonplaceholder.typicode.com/albums');
 export const Userdata =  () => {
    
   
   const data = resource.read();
    
     console.log(data);
   
    return (
        <div>
             
           {
             data.map((fd)=>(
                <ul key={fd.id}>
                    <li>userid : {fd.id}</li>
                    <li>title : {fd.title}</li>
                </ul>
            ))
           }
        </div>
    );

}