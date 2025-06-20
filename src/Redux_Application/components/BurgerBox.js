import React, { useContext, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderBurger, returnBurger } from './redux';
import { contextCount } from '../../ContextAPI/OrderCount';


const BurgerBox = () => {

    const data = useSelector(state => state.burger.burgerBase)
    const dispatch = useDispatch();
    const {pc,PizzaUpdateCount,bc,BurgerUpdateCount} = useContext(contextCount)
       const onClickHandler = () => {
            BurgerUpdateCount()
           return dispatch(orderBurger())    
       }
  return (
    <div>
        <ul><li><h2>BurgerBox</h2></li></ul>
        <center>
             <div className='container'>
           <h4 className='text'>Number of Burger available - {data}</h4>
           <button className='btn' onClick={onClickHandler}>order burger</button>
           {/* ()=>dispatch(orderBurger()) */}
           <button className='btn' onClick={()=>dispatch(returnBurger())}>return burger</button>
        </div>
        </center>
    </div>
  )
}

export default BurgerBox