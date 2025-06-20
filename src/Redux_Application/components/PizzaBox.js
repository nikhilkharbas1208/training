import { useContext, useRef, useState } from 'react'
import { orderPizza, returnPizza } from './redux'
import { connect } from 'react-redux'
import { contextCount } from '../../ContextAPI/OrderCount'


const PizzaBox = (props) => {
  const[quantity,setQuantity]=useState(0)
  const[quantity2,setQuantity2]=useState(0)
  const {pc,PizzaUpdateCount,bc,BurgerUpdateCount} = useContext(contextCount)
  const onClickHandler = (quantity) => {
        PizzaUpdateCount()
      return (props.orderPizza(quantity))
      
  }
  return (
    <div>
       <ul><li>  <h2>PizzaBox</h2></li></ul>
       <center>
             <div className='container'>
                    <h4 className='text'>Number of Pizza available - {props.pizzaBase}</h4>
                    
                    <input type='Number' placeholder='burgers to ORDER' value = {quantity} onChange = {(e)=>setQuantity(e.target.value)} ></input>
                    <button className='btn' onClick={()=>onClickHandler (quantity)}>Order Pizza</button><br/>
                    {/* ()=>props.orderPizza(quantity) */}
                    <input type='Number' placeholder='burgers to RETURN' value = {quantity2} onChange = {(d)=>setQuantity2(d.target.value)} ></input>
                    <button className='btn' onClick={()=>props.returnPizza(quantity2)}>Return Pizza</button>
                    

             </div>
       </center>
    </div>
  )
}
const mapStateToProps =(state)=>{
    return{
      pizzaBase : state.pizza.pizzaBase
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
      orderPizza : (quantity)=> dispatch(orderPizza(quantity)),
      returnPizza : (quantity)=> dispatch(returnPizza(quantity))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PizzaBox)

