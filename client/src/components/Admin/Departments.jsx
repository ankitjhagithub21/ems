import { Link } from "react-router-dom";
import Heading from "../common/Heading";
import List from "../common/List";
import Error from "../common/Error";
import Loader from "../common/Loader";
import axios from "axios";
import useFetchDepartments from "../../hooks/useFetchDepartments";
import { removeDepartment } from "../../api/admin/department";
import { toast } from "react-toastify";
import EditDepartment from "./EditDepartment";
import { useState, useRef } from "react";
import Search from "../common/Search";

axios.defaults.withCredentials = true;

const Departments = () => {
  const { departments,setDepartments, loading, error } = useFetchDepartments();
  const [editedDepartment, setEditedDepartment] = useState(null);
  const modalRef = useRef(null);
  const columns = ["S.No", "Department Name", "Action"];
  const fields = ["departmentName"];

  const onDelete = async (id) => {
    try {
      const res = await removeDepartment(id);
      setDepartments(departments.filter((dep)=>dep._id !== id))
      toast.success(res.data.message);

    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting department");
      console.log(error);
    }
  };

  const onEdit = (department) => {
    setEditedDepartment(department);
    modalRef.current?.showModal();

  };

  const onUpdate = (department) =>{
    setDepartments(departments.map((dep)=> dep._id === department._id ? department : dep ))
  }


  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <div>
      <EditDepartment ref={modalRef} department={editedDepartment} onUpdate={onUpdate}/>
      <Heading text={"Manage Departments"} />
      <div className="flex items-center justify-between mb-5">
        <Search />
        <Link to={"/admin-dashboard/add-department"} className="btn btn-primary" >Add Department</Link>
      </div>
      <List
        columns={columns}
        rows={departments}
        fields={fields}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
};

export default Departments;
