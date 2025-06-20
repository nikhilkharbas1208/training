import React, { createContext, useState } from 'react'
import PizzaBox from '../Redux_Application/components/PizzaBox';
 
export const contextCount = createContext()

export const OrderCountPovider = ({children}) => {
    const [pc,setPc]=useState(0);
    const [bc,setBc]=useState(0);
    const PizzaUpdateCount = ()=>{
            setPc(pc+1)
        } 
    const BurgerUpdateCount = ()=>{
            setBc(bc+1)
        } 
  return (
        <contextCount.Provider value={{pc,PizzaUpdateCount,bc,BurgerUpdateCount}}>
            {children}
        </contextCount.Provider>
  )
}



