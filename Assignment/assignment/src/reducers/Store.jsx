import { configureStore } from '@reduxjs/toolkit';
import tableReducer from '../features/tableSlice';


export const Store = configureStore({
    reducer : {
        table : tableReducer,
    },
})
