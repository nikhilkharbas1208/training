import { useReducer } from "react";

export const count =10;

 const  Reducer =(state = count, action) => {
    const{type,payload} = action;

    switch(type){
        case "INCREMENT":
            return  state+1;
        case "DECREMENT":
            return  state-1;
        default:
            return state;
    }

}

export default Reducer
 