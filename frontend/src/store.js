import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./Redux/Reducers/userReducers";
import { generalReducers } from "./Redux/Reducers/generalReducers";


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    general: generalReducers,
    
  });
  
  const userInfoFromStorage = localStorage.getItem("BankUser")
    ? JSON.parse(localStorage.getItem("BankUser"))
    : null;
  
  const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
  };


  const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;