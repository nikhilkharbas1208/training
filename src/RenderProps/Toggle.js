import React from 'react'

const Toggle = ({flag,children}) => {
   
  return <div>from toggle { children(flag)}</div>
}

export default Toggle