import { NavLink } from "react-router-dom";

const MenuItem = ({ icon, path, text }) => {
  return (
    <li className="my-2">
      <NavLink 
      
        to={path} 
        className={({ isActive }) => 
          `flex items-center gap-2 p-2 rounded-md ${
            isActive ? "bg-neutral text-white" : "hover:bg-neutral hover:text-white"
          }`
        }
        end
      >
        {icon}
        <span>{text}</span>
      </NavLink>
    </li>
  );
};

export default MenuItem;
