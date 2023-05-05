import axios from "axios";
import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer/Shimmer";
import { useDispatch } from "react-redux";
import { HideLoading, showLoading } from "../Redux/Actions/generalActions";


const Home = () => {
  const [userIds, setUserId] = useState("");
  const [userInfos,setUserInfos]=useState({})
  


  const userId = localStorage.getItem("BankUser")
    ? JSON.parse(localStorage.getItem("BankUser"))
    : "";

   let USERID=userId._id
   const dispatch=useDispatch()


   const {loading}=useSelector((state)=>state.general)

   useEffect(()=>{
      getUpdatedUserInfo()
   },[])


   const getUpdatedUserInfo=async()=>{


      dispatch(showLoading())
    const { data } = await axios.post(
        "http://localhost:5000/api/user/getuserinformation",
        {USERID},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("BankUserId")}`,
          },
        }
      );
      dispatch(HideLoading())
   

   if(data.success){

       setUserInfos(data.data)
   }

}


return (
   
 loading ? <Shimmer/> :


    <div className="d-flex justify-content-center align-items-center">
      <ListGroup className="w-5/12 mt-20">
        <ListGroup.Item className="border-black">
          Welcome: <span className='font-bold ps-3 text-red-500'>{userInfos?.name}</span>
        </ListGroup.Item>
        <ListGroup.Item className="border-black">
          YOUR ID: <span className='font-bold ps-3 text-blue-600'>{userInfos?.email}</span>
        </ListGroup.Item>
        <ListGroup.Item className="border-black">
          YOUR BALANCE: <span className='font-bold ps-3 text-green-400'>{userInfos?.balance}</span>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
  
};

export default Home;
