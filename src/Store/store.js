import { configureStore } from "@reduxjs/toolkit";
import  CakeReducer  from "../Features/CakeSlice";
import { createLogger } from "redux-logger"; 
import UserReduser from '../Features/UserSlice'
import JiraReducer from '../Features/JiraSlice'
//import JiraDeleteReducer from '../features/jira/jiraSliceDelete'

const logger = createLogger()
export const store = configureStore({
    reducer:{
        cake: CakeReducer,
        user: UserReduser,
        jira: JiraReducer,
        // jiradelete:JiraDeleteReducer,
    },
     middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger),
})