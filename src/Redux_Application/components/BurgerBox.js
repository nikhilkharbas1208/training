import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderBurger, returnBurger } from './redux';

const BurgerBox = () => {

    const data = useSelector(state => state.burger.burgerBase)
    const dispatch = useDispatch();
  return (
    <div>
        <ul><li><h2>BurgerBox</h2></li></ul>
        <center>
             <div className='container'>
           <h4 className='text'>Number of Burger available - {data}</h4>
           <button className='btn' onClick={()=>dispatch(orderBurger())}>order burger</button>
           <button className='btn' onClick={()=>dispatch(returnBurger())}>return burger</button>
        </div>
        </center>
    </div>
  )
}

export default BurgerBox