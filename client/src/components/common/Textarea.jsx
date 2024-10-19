import React from 'react'

const Textarea = ({ placeholder, value, setValue }) => {
  return (
    <textarea className='textarea textarea-primary resize-none' placeholder={placeholder} value={value} onChange={(e)=>setValue(e.target.value)} rows={3} required></textarea>
  )
}

export default Textarea
