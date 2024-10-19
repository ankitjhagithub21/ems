import { AiFillDashboard } from "react-icons/ai";
import { FaBuilding, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { PiMoneyWavyFill } from "react-icons/pi";
import MenuItem from './MenuItem'

const AdminSidebar = () => {
  
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <MenuItem text={"Dashboard"} path={"/"} icon={<AiFillDashboard/>}/>
          <MenuItem text={"Employee"} path={"/employees"} icon={<FaUsers/>}/>
          <MenuItem text={"Departments"} path={"/departments"} icon={<FaBuilding/>}/>
          <MenuItem text={"Leaves"} path={"/leaves"} icon={<FaCalendarAlt/>}/>
          <MenuItem text={"Salary"} path={"/salary"} icon={<PiMoneyWavyFill />}/>
          <MenuItem text={"Settings"} path={"/settings"} icon={<IoMdSettings />}/>
         
        </ul>
      </div>
    </div>
  )
}

export default AdminSidebar
