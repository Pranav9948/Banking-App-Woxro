import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { login } from '../Redux/Actions/userActions'
import { HideLoading, showLoading } from '../Redux/Actions/generalActions'
import Shimmer from '../components/Shimmer/Shimmer'




function Login() {
 
  const navigate = useNavigate()
  const dispatch=useDispatch()

  const {loading}=useSelector((state)=>state.general)

  const onFinish = async (values) => {
    try {
    
        dispatch(showLoading())
      const response = await axios.post("http://localhost:5000/api/user/login", values)
      dispatch(HideLoading())
    
      if (response.data.success) {
        toast.success(response.data.message)
        toast("Redirecting to home page")
    
        dispatch(login(response.data.user))
        localStorage.setItem('BankUserId', JSON.stringify(response.data.data));
        navigate("/")
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      
      toast.error("Something went wrong")
    }

  }
  return (

loading ? <Shimmer/> :

    <div className='authentication'>
      <div className='authentication-form card p-5'>
        <h1 className='card-title font-bold text-red-400 text-2xl'>Woxro-Bank-App</h1>
         <h6 className='font-bold text-center pt-3 pb-2'>LOGIN HERE</h6>
        <Form layout='vertical' onFinish={onFinish}>


          <Form.Item  label="Email" name="email">
            <Input className='login-input' placeholder='Email' />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input className='login-input' placeholder='Password' type='password' />
          </Form.Item>
          <Button className='primary-button mt-3 mb-3' htmlType='submit'>LOG-IN</Button>
          <Link to='/register' className='anchor ps-2'> Register</Link>
        </Form>
      </div>
    </div>
  )
}

export default Login