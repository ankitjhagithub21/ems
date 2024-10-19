import { Link } from "react-router-dom"
import Heading from "../common/Heading"
import List from "../common/List"
import Error from "../common/Error"
import Loader from "../common/Loader"
import axios from "axios"
import useFetchDepartments from "../../hooks/useFetchDepartments"
axios.defaults.withCredentials = true

const Departments = () => {
  const { departments, loading, error } = useFetchDepartments()
  const columns = [
    "S.No",
    "Department Name",
    "Action"
  ]
  const fields = [
    "departmentName",
  ]



  if (loading) {
    return <Loader />
  }
  if(error){
    return <Error/>
  }
  return (
    <div>
      <Heading text={"Manage Departments"} />
      <Link to={"/admin-dashboard/add-department"}>Add Department</Link>
      <List columns={columns} rows={departments} fields={fields} />
    </div>
  )
}

export default Departments
