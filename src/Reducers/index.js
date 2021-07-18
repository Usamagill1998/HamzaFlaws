import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import cartReducer from "./CartReducer";

export default combineReducers({
  auth: authReducer,
  posts: postReducer,
  cart: cartReducer,
});
