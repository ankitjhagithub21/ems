import { Link } from "react-router-dom";
import Heading from "../common/Heading";
import Error from "../common/Error";
import Loader from "../common/Loader";
import { toast } from "react-toastify";
import { FaTrash,FaEdit } from "react-icons/fa";
import Search from "../common/Search";
import useFetchEmployees from "../../hooks/useFetchEmployees";
import { removeEmployee } from "../../api/admin/employee";


const Employees = () => {
  const { employees, setEmployees, loading, error } = useFetchEmployees();
  const columns = ["S.No", "Image", "Name", "Department", "Action"];


  const onDelete = async (id) => {
    try {
      const res = await removeEmployee(id);
      setEmployees(employees.filter((emp) => emp._id !== id))
      toast.success(res.data.message);

    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting employee");
      console.log(error);
    }
  };



  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <div>

      <Heading text={"Manage Employees"} />
      <div className="flex items-center justify-between mb-5 gap-5">
        <Search />
        <Link to={"/admin-dashboard/add-employee"} className="btn btn-primary" >Add Employee</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              {
                columns.map((col, idx) => {
                  return <th key={idx} className='font-semibold'>{col}</th>
                })
              }
            </tr>
          </thead>
          <tbody>
            {/* employee 1 */}
            {
              employees.length === 0 ? <p>No data found.</p> : employees.map((employee, index) => {
                return <tr key={employee._id} className="hover:bg-base-200 ">
                  <th>{index + 1}</th>
                  <td>
                    <img src={employee.userId.profileImage} alt="profile_pic" className="w-14 h-14 border rounded-full object-cover" />
                  </td>
                  <td>{employee.userId.name}</td>
                  <td>{employee.department.departmentName}</td>
               
                  <td>
                   <div className="flex items-center gap-3">
                   <FaTrash size={17}  className='text-red-600 cursor-pointer' onClick={() => onDelete(employee._id)} />
                   <FaEdit size={20} className='text-primary cursor-pointer'/>
                   </div>
                  </td>

                </tr>
              })
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
