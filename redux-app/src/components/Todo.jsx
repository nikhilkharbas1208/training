import { useDispatch, useSelector } from "react-redux";
// import { MdDeleteForever} from "react-icons/md";
// import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { addTask, deleteTask } from "../features/tasks/taskSlice";

export const Todo = () => {
    const [userTask, setUserTask] = useState("");
     const tasks = useSelector((state) => state.taskReducer.task);
    const dispatch = useDispatch();
    // const dispatch = useDispatch();
    // // console.log("react state",state.task);
    // // const handleTaskDelete = (index) => {
    // //     dispatch(deleteTask(index)); 
    // // };
    // //add task
    const handleFormSubmit =(e) => {
        e.preventDefault();
        dispatch(addTask(userTask));
        return setUserTask("");
    }
    //delete task
    const handleDeleteTask = (id) => {
        return dispatch(deleteTask(id));
    }

    // const handleFetchTask = (id) => {
    //     return dispatch(fetchTask(id));
    // }
    const handleFetchTask = () =>{
        
    }

    return(
        <><div>
        <h1>To-do List</h1>
        <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Add a new Task" value={userTask}
             onChange={(e)=>setUserTask(e.target.value)}/>
            <button>Add Task</button>
        </form>
        </div>
        <button onClick={handleFetchTask}>Fetch Task</button>
        <ul>
            {
                tasks.map((curTask, index)=>{
                    return (<li key={index}>
                        <p>
                            {index}: {curTask}
                        </p>
                        <div>
                            <MdDeleteForever className="icon-style" onClick={()=>handleDeleteTask(index)}/>
                            
                        </div>
                    </li>);
                })
            }
        </ul>
        </>
    );
};