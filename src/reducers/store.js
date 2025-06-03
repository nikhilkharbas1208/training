import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import reducers from ".";
let middlewares = [thunk];
const composedEnhancer = composeWithDevTools(applyMiddleware(middlewares));
export const store = configureStore({ reducer: reducers, composedEnhancer });
