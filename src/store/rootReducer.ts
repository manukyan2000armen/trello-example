import { combineReducers } from "redux";
import { taskReducer } from "./tasks/reduce";
import { userReducer } from "./user/reduce";

export default combineReducers({
  task: taskReducer,
  users: userReducer,
});
