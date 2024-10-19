import { Link } from "react-router-dom";
import Heading from "../common/Heading";
import List from "../common/List";
import Error from "../common/Error";
import Loader from "../common/Loader";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import Search from "../common/Search";
import useFetchEmployees from "../../hooks/useFetchEmployees";
import { removeEmployee } from "../../api/admin/employee";


const Employees = () => {
  const { employees,setEmployees, loading, error } = useFetchEmployees();
  const [editedEmployee, setEditedEmployee] = useState(null);
  const modalRef = useRef(null);
  const columns = ["S.No", "Image", "Name","Department", "Action"];
  const fields = ["name","profileImage","department"];

  const onDelete = async (id) => {
    try {
      const res = await removeEmployee(id);
      setEmployees(employees.filter((emp)=>emp._id !== id))
      toast.success(res.data.message);

    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting employee");
      console.log(error);
    }
  };

  const onEdit = (employee) => {
    setEditedDepartment(employee);
    modalRef.current?.showModal();

  };

  const onUpdate = (employee) =>{
    setDepartments(employees.map((emp)=> emp._id === emp._id ? employee : emp ))
  }


  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <div>
     
      <Heading text={"Manage Employees"} />
      <div className="flex items-center justify-between mb-5 gap-5">
        <Search />
        <Link to={"/admin-dashboard/add-employee"} className="btn btn-primary" >Add Employee</Link>
      </div>
      <List
        columns={columns}
        rows={employees}
        fields={fields}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
};

export default Employees;
