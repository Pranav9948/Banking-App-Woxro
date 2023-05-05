import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { login,register } from "../Redux/Actions/userActions";
import { useDispatch } from "react-redux";


function ProtectedRoutes(props) {
  const dispatch = useDispatch();


  const userInfo=useSelector((state)=>state?.userLogin?.userInfo)
  console.log("manh",userInfo)

 

  const getDetailsAPI = async () => {
    try {
      console.log("reached...");
    

   
      const { data } = await axios.post(
        "/api/user/get-userinfo-by-id",
        { token: localStorage.getItem("BankUserId") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("BankUserId")}`,
          },
        }
      );

      console.log("mannn",data)
      console.log("king",data.data)

      if (data.data) {
        dispatch(login(data.data));
      } else {
      }

      // dispatch(HideLoading());
    } catch (err) {
      console.log("err", err);
      // dispatch(HideLoading());
    }
  };

  useEffect(() => {
    if (userInfo===null) {
      console.log("api called");
      getDetailsAPI();
      
    } else {
      console.log("length >0");
    }
  }, [userInfo, getDetailsAPI]);

  if (localStorage.getItem("BankUserId")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectedRoutes;