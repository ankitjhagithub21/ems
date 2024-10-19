import Card from "./Card"
import {FaAppStore, FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaTimesCircle, FaUsers} from "react-icons/fa"
import { PiMoneyWavyFill } from "react-icons/pi";
const Summary = () => {
  return (
    <div>
      
      <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      <Card icon={<FaUsers/>} text="Total Employees" number={5} color="bg-purple-700"/>
      <Card icon={<FaBuilding/>} text="Total Departments" number={5} color="bg-teal-700"/>
      <Card icon={<PiMoneyWavyFill/>} text="Monthly Salary" number={5} color="bg-pink-500"/>
      </div>
      <h2 className="font-bold text-2xl my-5">Leave Details</h2>
      <div className="grid gap-5 md:grid-cols-2 grid-cols-1">
      <Card icon={<FaFileAlt/>} text="Leave Applied" number={5} color="bg-blue-700"/>
      <Card icon={<FaCheckCircle/>} text="Leave Approved" number={3} color="bg-green-700"/>
      <Card icon={<FaHourglassHalf/>} text="Leave Pending" number={2} color="bg-yellow-700"/>
      <Card icon={<FaTimesCircle/>} text="Leave Rejected" number={1} color="bg-red-500"/>
      </div>
    </div>
  )
}

export default Summary
