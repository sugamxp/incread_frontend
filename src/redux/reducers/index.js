import { combineReducers } from "redux";
import authReducer from "./authReducer";
import articlesReducer from "./articlesReducer";
export default combineReducers({
  auth: authReducer,
  articles: articlesReducer
});
