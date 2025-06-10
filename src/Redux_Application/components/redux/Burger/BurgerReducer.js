
import { ORDER_BURGER, RETURN_BURGER } from "./BurgerTypes";

export const intialState ={
    burgerBase:1500
}
const BurgerReducer = (state = intialState,actions)=>{

    switch(actions.type){
        case ORDER_BURGER :
            return{
                ...state,
                burgerBase:state.burgerBase-1,
            }
        case RETURN_BURGER :
            return {
                ...state,
                burgerBase:state.burgerBase+1,
            }
        default :
            return state
    }
    
}

export default BurgerReducer