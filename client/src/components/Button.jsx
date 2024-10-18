import React from 'react'

const Button = ({text,loading}) => {
  return (
    <button className='btn btn-primary' disabled={loading}>
      {
        loading && <span className="loading loading-spinner"></span>
      }
      {text}
    </button>
  )
}

export default Button
