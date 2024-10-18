import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (

    <div className='max-w-md mx-auto mt-24'>
      <h2 className='text-center text-xl font-bold'>Login</h2>
      <form className='flex flex-col gap-3 p-5'>

        <Input type={"email"} placeholder={"Enter your email"} name={"email"} value={email} setValue={setEmail}  />

        <Input type={"password"} placeholder={"Enter your password"} value={password} setValue={setPassword}  />

        <Button text={"Log in"} />

      </form>
    </div>
  )
}

export default Login
