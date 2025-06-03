import { useDispatch, useSelector } from "react-redux";
// import { MdDeleteForever} from "react-icons/md";
import { addTask, deleteTask } from "../store";
import { useState } from "react";

export const Todo = () => {
    const [task, setTask] = useState("");
    const tasks = useSelector((state) => state.task);
    
    const dispatch = useDispatch();
    // console.log("react state",state.task);
    // const handleTaskDelete = (index) => {
    //     dispatch(deleteTask(index)); 
    // };
    //add task
    const handleFormSubmit =(e) => {
        e.preventDefault();
        dispatch(addTask(task));
        return setTask("");
    }
    //delete task
    const handleDeleteTask = (id) => {
        return dispatch(deleteTask(id));
    }

    return(
        <><div>
        <h1>To-do List</h1>
        <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Add a new Task" value={task}
            onChange={(e)=>setTask(e.target.value)}/>
            <button>Add Task</button>
        </form>
        </div>
        <ul>
            {
                tasks.map((curTask, index)=>{
                    return <li key={index}>
                        <p>
                            {index}: {curTask}
                        </p>
                        <div>
                            {/* <MdDeleteForever className="icon-style"/> */}
                            <button onClick={()=>handleDeleteTask(index)}>delete</button>
                        </div>
                    </li>
                })
            }
        </ul>
        </>
    );
};