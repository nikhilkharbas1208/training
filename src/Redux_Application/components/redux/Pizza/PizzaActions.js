import {ORDER_PIZZA,RETURN_PIZZA} from './PizzaTypes'

export const orderPizza = (quantity=1) => {
  return {
        type: ORDER_PIZZA,
        payLoad:quantity
  }
}

export const returnPizza =(quantity=1) =>{
  return{
      type: RETURN_PIZZA,
       payLoad:quantity
  }
}


