import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {register} from '../Redux/Actions/userActions'
import { HideLoading, showLoading } from "../Redux/Actions/generalActions";
import Shimmer from "../components/Shimmer/Shimmer";

const Register = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch=useDispatch()
  const navigate=useNavigate()


  const {loading}=useSelector((state)=>state.general)

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
    console.log(confirmPassword);
    if (password !== value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const onFinish = async (values) => {

    console.log('man',values);

    try {

      if (password !== confirmPassword) {
        toast("passwords do not match")
        console.log(confirmPassword);
        return
      }
      else {
      
         dispatch(showLoading())
          const response =await axios.post('http://localhost:5000/api/user/register', values)
          console.log('1244',response)
      
          dispatch(HideLoading())
          if (response.data.success) {
            toast.success(response.data.message)
            toast("Redirecting to login page")
             dispatch(register(response.data.user))
            navigate("/login")
          } else {
            toast.error(response.data.message)
          }
        

      }
    }
    catch (error) {
      toast.error("something went wrong")
    }


  };
















  return (
   
   loading ? <Shimmer/> :
   
   <div className="authentication">
      <div className="authentication-form card p-4">
        <h1 className="card-title font-bold text-9xl text-orange-300 pt-3 pb-3 ">WOXRO-BANK-APP</h1>
         <h6 className="text-center font-bold text-2xl pb-11">Register Here</h6>
        
        <Form layout="vertical"  onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your username" },
              {
                pattern: /^[a-zA-Z0-9_]{3,16}$/,
                message:
                  "Your username should be between 3 and 16 characters and only contain letters, numbers, and underscores",
              },
            ]}
          >
            <Input className="login-input" placeholder="Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "Please enter a valid email address" },
              { required: true, message: "Please enter your email address" },
            ]}
          >
            <Input className="login-input" placeholder="Email" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
          </Form.Item>

          <Form.Item label="Confirm Password" name="cpassword">
            <Input
              className="login-input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              type="password"
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Form.Item>

          <Button className="primary-button mt-3 mb-3" htmlType="submit">
            REGISTER
          </Button>
          <Link
            to="/login"
            style={{ marginLeft: "1rem" }}
            className="anchor"
          >
            Click here to Login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
