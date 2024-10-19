import Card from "./Card"
import {FaBuilding, FaUsers} from "react-icons/fa"
import { PiMoneyWavyFill } from "react-icons/pi";
const Summary = () => {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
      <Card icon={<FaUsers/>} text="Total Employees" number={5} color="bg-red-500"/>
      <Card icon={<FaBuilding/>} text="Total Departments" number={5} color="bg-indigo-500"/>
      <Card icon={<PiMoneyWavyFill/>} text="Monthly Salary" number={5} color="bg-pink-500"/>
      </div>
    </div>
  )
}

export default Summary
