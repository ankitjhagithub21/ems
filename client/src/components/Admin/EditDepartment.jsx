import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import { useState, forwardRef, useEffect } from "react";
import { updateDepartment } from "../../api/admin/department";
import { toast } from "react-toastify";

const EditDepartment = forwardRef(({ department, onUpdate}, ref) => {
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Update state whenever the department prop changes
  useEffect(() => {
    if (department) {
      setDepartmentName(department.departmentName || "");
      setDescription(department.description || "");
    }
  }, [department]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateDepartment(department._id, {
        departmentName,
        description,
      });

      if (response.status === 200) {
        toast.success("Department updated successfully.");
        onUpdate(response.data)
        setDepartmentName("");
        setDescription("");
        ref.current.close(); // Close the modal
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating department");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Edit Department</h3>
          <button className="btn btn-square" onClick={() => ref.current.close()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="modal-action">
          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Enter department name"
              value={departmentName}
              setValue={setDepartmentName}
            />
            <Textarea
              placeholder="Enter description"
              value={description}
              setValue={setDescription}
            />
            <Button text="Save changes" loading={loading} />
          </form>
        </div>
      </div>
    </dialog>
  );
});

export default EditDepartment;
