import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    task: []
};
export const taskReducer = createSlice({
    name:"task",
    // initialState: initialState
    initialState,
    reducers: {
        addTask(state,action) {
            state.task.push(action.payload);
            // state.task= [...state.task, action.payload],

        },
        deleteTask(state, action) {
            state.task = state.task.filter((curTask,index) => index!==action.payload);

        },
    },
});

console.log(taskReducer);
export const {addTask, deleteTask} = taskReducer.actions;
