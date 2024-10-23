import React, { useState, forwardRef, useEffect } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Heading from '../common/Heading';
import { toast } from 'react-toastify';
import { updateEmployee } from '../../api/admin/employee';
import useFetchDepartments from '../../hooks/useFetchDepartments';

const EditEmployee = forwardRef(({ employee, onUpdate }, ref) => {
  const { departments } = useFetchDepartments();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [salary, setSalary] = useState('');
  const [designation, setDesignation] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Populate form with employee data when the employee prop changes
  useEffect(() => {
    if (employee) {
      setName(employee.userId.name || '');
      setEmail(employee.userId.email || '');
      setEmployeeId(employee.employeeId || '');
      setDob(employee.dob || '');
      setGender(employee.gender || '');
      setMaritalStatus(employee.maritalStatus || '');
      setSalary(employee.salary || '');
      setDesignation(employee.designation || '');
      setRole(employee.userId.role || '');
      setDepartment(employee.department || '');
    }
    console.log(employee)
  }, [employee]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('dob', dob);
    formData.append('employeeId', employeeId);
    formData.append('role', role);
    formData.append('gender', gender);
    formData.append('department', department);
    formData.append('maritalStatus', maritalStatus);
    formData.append('salary', salary);
    formData.append('designation', designation);
    formData.append('password', password);
    if (image) formData.append('image', image);

    setLoading(true);

    try {
      const response = await updateEmployee(employee._id, formData);
      if (response.status === 200) {
        toast.success('Employee updated successfully.');
        onUpdate(response.data);
        ref.current.close(); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating employee.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <div className="flex items-center justify-between">
          <Heading text="Edit Employee" />
          <button className="btn btn-square" onClick={() => ref.current.close()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input type="text" placeholder="Name" value={name} setValue={setName} />
          <Input type="email" placeholder="Email" value={email} setValue={setEmail} />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} className="input input-neutral" />
          <Input type="text" placeholder="Employee ID" value={employeeId} setValue={setEmployeeId} />
          <Input type="date" value={dob} setValue={setDob} />

          <select value={gender} onChange={(e) => setGender(e.target.value)} className="select select-primary">
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} className="select select-primary">
            <option value="" disabled>Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>

          <Input type="text" placeholder="Designation" value={designation} setValue={setDesignation} />
          <Input type="number" placeholder="Salary" value={salary} setValue={setSalary} />

          <select value={department} onChange={(e) => setDepartment(e.target.value)} className="select select-primary">
            <option value="" disabled>Select Department</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>{dep.departmentName}</option>
            ))}
          </select>

          <select value={role} onChange={(e) => setRole(e.target.value)} className="select select-primary">
            <option value="" disabled>Select Role</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>

          <Button text="Save Changes" loading={loading} />
        </form>
      </div>
    </dialog>
  );
});

export default EditEmployee;
