import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    
  } from "../constants/userconstants";
  import axios from "axios";
  
  
  
  export const login = (data) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
        
      console.log("datass", data);
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem('BankUser', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const register = (data) => async (dispatch) => {

    console.log('act',data)
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
  
    
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem('BankUser', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


     
    
 




  
  
  export const logout = () => async (dispatch) => {
    localStorage.removeItem("BankUser");
    localStorage.removeItem("BankUserId");
    dispatch({ type: USER_LOGOUT });
  };
  
  
  