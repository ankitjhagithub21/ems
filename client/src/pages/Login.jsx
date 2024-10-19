import React, { useState } from 'react'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/authSlice'
axios.defaults.withCredentials = true

const Login = () => {
 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispath = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
        email, password
        
      })
      
      toast.success(response.data.message)

      dispath(setUser(response.data.user))
     
      if(response.data.user.role === "admin"){
         navigate("/admin-dashboard")
      }else{
        navigate("/employee-dashboard")
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
     
    } finally {
      setLoading(false)
    }
  }
  return (

    <div className='max-w-md mx-auto mt-24'>
      <h2 className='text-center text-xl font-bold'>Login</h2>
      <form className='flex flex-col gap-3 p-5' onSubmit={handleLogin}>

        <Input type={"email"} placeholder={"Enter your email"} name={"email"} value={email} setValue={setEmail} />

        <Input type={"password"} placeholder={"Enter your password"} value={password} setValue={setPassword} />

        <Button text={"Log in"} loading={loading}/>

      </form>
    </div>
  )
}

export default Login
