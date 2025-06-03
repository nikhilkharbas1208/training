import { createStore } from 'redux';
const ADD_TASK ="task/add";
const DELETE_TASK ="task/delete";
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
    
        default:
            return state;
    }
};


export const store = createStore(taskReducer);
console.log(store);
console.log("Initial State:",store.getState());
// Create action creators

export const addTask = (data) => {
    return { type: ADD_TASK , payload: data }
};

export const deleteTask = (id) => {
    return { type: DELETE_TASK , payload: id }
};
// Dispatch function to add task
// store.dispatch({ type: ADD_TASK , payload: "Coding" });
store.dispatch(addTask("Coding"));
store.dispatch(addTask("Buy Dress"));
console.log("Updated State:",store.getState());
store.dispatch(deleteTask(1));
console.log("Updated State:",store.getState());

