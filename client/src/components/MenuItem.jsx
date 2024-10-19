import { NavLink } from 'react-router-dom'

const MenuItem = ({ icon, path, text }) => {
    return (
        <li>
            <NavLink to={path}>
                {icon}
               <span>{text}</span>
            </NavLink>
        </li>
    )
}

export default MenuItem
