import React from 'react'

const Input = ({type,placeholder,value,setValue}) => {
  return (
    <input type={type} className="input input-bordered" placeholder={placeholder} value={value} onChange={(e)=>setValue(e.target.value)} required/>
  )
}

export default Input
