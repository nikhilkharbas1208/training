import React, { useState } from 'react'

const CCAmount = ({render}) => {

    const [amount,setAmount] = useState(0)

  return (
    
      <>
        <h3>---Currency Conveter-----</h3>
        <br/>
        <input type="number" placeholder='enter the rupees value' onChange={(e)=>setAmount(e.target.value)}></input>
    <div>
        {render(amount)}
    </div>
      </>

  )
}

export default CCAmount