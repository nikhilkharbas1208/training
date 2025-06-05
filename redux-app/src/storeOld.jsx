import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
const ADD_TASK ="task/add";
const DELETE_TASK ="task/delete";
const FETCH_TASK ="task/fetch";
const initialState ={
    task: [],
};
const taskReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TASK:
        return {
            ...state,  //make copy of old state
            task: [...state.task, action.payload],
        };

        case DELETE_TASK:
        const updatedTask = state.task.filter((curTask,index) => {
            return index !== action.payload;
        });
        return {
            ...state,  //make copy of old state
            task: updatedTask,
        };

        case FETCH_TASK:
        return {
            ...state,  //make copy of old state
            task: [...state.task, ...action.payload],
        };
    
        default:
            return state;
    }
};

// ***old style: create store */
export const store = createStore(taskReducer,composeWithDevTools(applyMiddleware(thunk)));

console.log(store);
console.log("Initial State:",store.getState());


// Create action creators
export const addTask = (data) => {
    return { type: ADD_TASK , payload: data }
};

export const deleteTask = (id) => {
    return { type: DELETE_TASK , payload: id }
};
// middleware function
export const fetchTask = () => {
        return async (dispatch) => {
            try{
            const res= await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
            const task =await res.json();
            dispatch({ type: FETCH_TASK , payload: task.map((curTask) => curTask.title) })
            } catch (error) {
                console.log(error);
            }
        };
};

// Dispatch function to add task


