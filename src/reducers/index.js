import { combineReducers } from "redux";
import getTableReducer from "./TableReducer";

export default combineReducers({ table: getTableReducer });
