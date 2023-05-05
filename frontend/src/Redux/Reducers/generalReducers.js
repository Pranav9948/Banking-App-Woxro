import {
    HIDE_LOADING,
    SHOW_LOADING,
  
  } from "../constants/generalConstants";
  
  export const generalReducers = (state = {}, action) => {
    switch (action.type) {
      case SHOW_LOADING:
        console.log("1Rs");
  
        return { loading: true };
  
      case HIDE_LOADING:
        console.log("1RH");
        return { loading: false };
  
      default:
        return state;
    }
  };
  