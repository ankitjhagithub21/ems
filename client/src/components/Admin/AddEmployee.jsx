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
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null)


  const handleFileChange = (e) => {
    setImage(e.target.files[0])
    setPreviewImage(URL.createObjectURL(e.target.files[0]))

  }

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
     

      <form className="flex flex-col gap-6   max-w-2xl w-full mx-auto" onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="flex flex-col items-center gap-3">
          <label htmlFor="employee" className="cursor-pointer">
            <img
              src={previewImage || '/user.png'}
              alt="user"
              className="w-32 h-32 rounded-full shadow-lg object-cover"
            />
          </label>
          <input
            type="file"
            className="hidden"
            id="employee"
            name="employee"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Personal Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="text"
            placeholder="Enter employee name"
            value={name}
            setValue={setName}
          />
          <Input
            type="email"
            placeholder="Enter employee email"
            value={email}
            setValue={setEmail}
          />
        </div>

        {/* Password & Employee Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            setValue={setPassword}
          />
          <Input
            type="text"
            placeholder="Enter employee ID"
            value={employeeId}
            setValue={setEmployeeId}
          />
        </div>

        {/* Date of Birth & Gender */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="date"
            value={dob}
            setValue={setDob}
          />
          <select
            className="select select-primary w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Marital Status & Designation */}
        <div className="grid md:grid-cols-2 gap-4">
          <select
            className="select select-primary w-full"
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
            required
          >
            <option value="" disabled>Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
          <Input
            type="text"
            placeholder="Enter designation"
            value={designation}
            setValue={setDesignation}
          />
        </div>

        {/* Salary & Department */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="number"
            placeholder="Enter salary"
            value={salary}
            setValue={setSalary}
          />
          <select
            className="select select-primary w-full"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="" disabled>Select Department</option>
            {departments.map((dep) => (
              <option key={dep._id} value={dep._id}>
                {dep.departmentName}
              </option>
            ))}
          </select>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-4">
          <select
            className="select select-primary w-full"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
          <Button text="Add Employee" loading={loading} />

        </div>

       
      </form>

    </div>
  );
};

export default AddEmployee;
