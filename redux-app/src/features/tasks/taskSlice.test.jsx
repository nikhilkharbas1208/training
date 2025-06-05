import { addTask, deleteTask } from "./taskSlice";

// store.dispatch({ type: ADD_TASK , payload: "Coding" });
store.dispatch(addTask("Coding"));
store.dispatch(addTask("Buy Dress"));
console.log("Updated State:",store.getState());
store.dispatch(deleteTask(1));
console.log("Updated State:",store.getState());