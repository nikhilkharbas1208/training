import { configureStore } from "@reduxjs/toolkit";
import PizzaSlice from "../features/Pizza/PizzaSlice";
import {createLogger} from 'redux-logger'

const logger = createLogger()
const store = configureStore({
    reducer:{
        pizza:PizzaSlice,
        // burger:BurgerSlice
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concate(logger)
})

export default store