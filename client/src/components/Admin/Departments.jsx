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

axios.defaults.withCredentials = true;

const Departments = () => {
  const { departments, loading, error } = useFetchDepartments();
  const [editedDepartment, setEditedDepartment] = useState(null);
  const modalRef = useRef(null); 

  const columns = ["S.No", "Department Name", "Action"];
  const fields = ["departmentName"];

  const onDelete = async (id) => {
    try {
      const res = await removeDepartment(id);
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


  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <div>
      <EditDepartment ref={modalRef} department={editedDepartment} />
      <Heading text={"Manage Departments"} />
      <Link to={"/admin-dashboard/add-department"}>Add Department</Link>
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
