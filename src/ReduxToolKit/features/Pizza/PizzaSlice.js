import {createSlice} from '@reduxjs/toolkit'

const initialState={
    pizzaBase:999
}
const  PizzaSlice = createSlice({
    name:'pizza',
    initialState,
    reducers:{
        pizza_order:(state)=>{
            state.pizzaBase--
        }
    }

})

console.log(PizzaSlice)
export default  PizzaSlice