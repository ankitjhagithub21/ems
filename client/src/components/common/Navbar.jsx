import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/slices/authSlice'
axios.defaults.withCredentials = true

const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`)
      dispatch(setUser(null))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <nav>
      <div className="navbar container mx-auto bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          EMS
        </a>
      </div>
      <div className="flex-none gap-2">
       <p>Welcome {user.name}</p>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.profileImage ? user.profileImage : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}/>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          
            <li><a>Profile</a></li>
            <li onClick={handleLogout}><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    </nav>
  )
}

export default Navbar
