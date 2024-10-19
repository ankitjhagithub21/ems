
const Input = ({type,placeholder,value,setValue}) => {
  return (
    <input type={type} className="input input-primary" placeholder={placeholder} value={value} onChange={(e)=>setValue(e.target.value)} required/>
  )
}

export default Input
