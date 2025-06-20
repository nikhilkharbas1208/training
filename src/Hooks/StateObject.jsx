import React, { useState } from 'react'

const StateObject = () => {

 const initial ={
        name :"ramu",
        age :"20",
        salary :8000,
    }
    const adc = useState(0);
    const [emp , setEmp]=useState(initial);
    const salaryUpdate = ()=>{
        setEmp((prev)=>{
            let n = emp.salary+10;
            adc=adc+10;
           // n=n+10;
            //console.log(emp.salary+"  hkjnx");
            return{...prev,salary:n}
        })
    }
  return (
    <div>
        <h3>StateObject</h3>
        <h1>Employee Details</h1>  
        <ul>
            <li> name : {emp.name}</li>
            <li> age : {emp.age}</li>
            <li>salary :{emp.salary}</li>
            <li><strong>adc</strong></li>
        </ul>
        <button onClick={salaryUpdate}>increase salary</button>
    </div>

  )
}

export default StateObject