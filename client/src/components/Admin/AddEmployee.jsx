import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import Heading from '../common/Heading';
import { toast } from 'react-toastify';
import { addNewEmployee } from '../../api/admin/employee';
import BackButton from '../common/BackButton';
import useFetchDepartments from '../../hooks/useFetchDepartments';

const AddEmployee = () => {
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
  const [password,setPassword] = useState('')
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Please upload an image.');
      return;
    }

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
    formData.append('image', image);

    setLoading(true);

    try {
      const response = await addNewEmployee(formData);
      if (response.status === 201) {
        toast.success('Employee added successfully.');
      
        setName('');
        setEmail('');
        setEmployeeId('');
        setDob('');
        setGender('');
        setMaritalStatus('');
        setSalary('');
        setDesignation('');
        setRole('');
        setDepartment('');
        setImage(null);
        setPassword('')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 mx-auto">
      <BackButton />
      <Heading text="Add New Employee" />

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex md:flex-row flex-col gap-3">
         
          <input
            type="file"
            className='w-full input input-neutral'
            name="employee"
            id="employee"
            onChange={(e) => setImage(e.target.files[0])}
            required

          />
            <Input
            type="text"
            placeholder="Enter employee name"
            value={name}
            setValue={setName}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-3">
        
          <Input
            type="email"
            placeholder="Enter employee email"
            value={email}
            setValue={setEmail}
          />
           <Input
            type="password"
            placeholder="Enter password"
            value={password}
            setValue={setPassword}
          />

        </div>

        <div className="flex md:flex-row flex-col gap-3">
          <Input
            type="text"
            placeholder="Enter employee ID"
            value={employeeId}
            setValue={setEmployeeId}
          />
          <Input
            type="date"
            value={dob}
            setValue={setDob}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-3">
          <select
            className="select select-primary w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <select
            className="select select-primary w-full"
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
            required
          >
            <option value="" disabled>
              Marital Status
            </option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        <div className="flex md:flex-row flex-col gap-3">
          <Input
            type="text"
            placeholder="Enter designation"
            value={designation}
            setValue={setDesignation}
          />
          <Input
            type="number"
            placeholder="Enter salary"
            value={salary}
            setValue={setSalary}
          />
        </div>

        <div className="flex md:flex-row flex-col gap-3">
          <select
            className="select select-primary w-full"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Department
            </option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.departmentName}
              </option>
            ))}
          </select>

          <select
            className="select select-primary w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>

       
        <Button text="Add Employee" loading={loading} />
      </form>
    </div>
  );
};

export default AddEmployee;
