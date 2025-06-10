import {createStore,applyMiddleware} from 'redux';
import pizzaReducer from './Pizza/PizzaReducer';
import { combineReducers } from 'redux';
import BurgerReducer from './Burger/BurgerReducer';
import {thunk} from 'redux-thunk'
import logger from 'redux-logger'
import ProductsReducer from './Products/ProductsReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

 const middleware =  [thunk]
 const reducer = combineReducers({
    pizza : pizzaReducer,
    burger : BurgerReducer,
    product : ProductsReducer
 })
 const store = createStore(reducer,
    composeWithDevTools( applyMiddleware(logger,...middleware)))  

 export default store