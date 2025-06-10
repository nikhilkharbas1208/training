import { ORDER_PIZZA, RETURN_PIZZA } from "./PizzaTypes"

export const intialState ={
    pizzaBase:1000
}

const pizzaReducer = (state=intialState,action)=>{
    switch(action.type){
        case ORDER_PIZZA :
            console.log(action.payLoad);
            return{
                ...state,
                    pizzaBase:state.pizzaBase-Number(action.payLoad),
            }

        case RETURN_PIZZA :
            return{
                ...state,
                    pizzaBase:state.pizzaBase+Number(action.payLoad),
            }

        default :
                return  state
    }
}

export default pizzaReducer;