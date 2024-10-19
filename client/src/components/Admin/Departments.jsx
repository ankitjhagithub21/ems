import { Link } from "react-router-dom"
import Heading from "../common/Heading"

const Departments = () => {
  return (
    <div>
      <Heading text={"Department List"}/>
      <Link to={"/admin-dashboard/add-department"}>Add Department</Link>
    </div>
  )
}

export default Departments
