import { AiFillDashboard } from "react-icons/ai";
import { FaBuilding, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { PiMoneyWavyFill } from "react-icons/pi";
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const AdminDashboard = () => {
  const menuItems = [
    { text: "Dashboard", path: "", icon: <AiFillDashboard /> }, // Changed path to "" for the root
    { text: "Employee", path: "employees", icon: <FaUsers /> },
    { text: "Departments", path: "departments", icon: <FaBuilding /> },
    { text: "Leaves", path: "leaves", icon: <FaCalendarAlt /> },
    { text: "Salary", path: "salaries", icon: <PiMoneyWavyFill /> },
    { text: "Settings", path: "settings", icon: <IoMdSettings /> },
  ];

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-5">
          {/* This will render the nested routes */}
          <Outlet />
        </div>
        <Sidebar menuItems={menuItems} />
      </div>
    </div>
  );
};

export default AdminDashboard;
