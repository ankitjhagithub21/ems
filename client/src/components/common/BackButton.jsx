import { useNavigate} from 'react-router-dom'

import { MdKeyboardBackspace } from "react-icons/md";
const BackButton = () => {
    const navigate = useNavigate()
  return (
    <button className='btn btn-primary flex items-center' onClick={()=>navigate(-1)}>
      <MdKeyboardBackspace/>
      Back
    </button>
  )
}

export default BackButton
