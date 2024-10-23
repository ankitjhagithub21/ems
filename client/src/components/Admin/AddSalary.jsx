import React, { useEffect, useState } from 'react'
import { getDepartments } from '../../api/admin/department'
import { getEmployeesByDepartMentId } from '../../api/admin/employee'
import Input from '../common/Input'
import Button from '../common/Button'
import { addSalary } from '../../api/admin/salary'
import { toast } from 'react-toastify'

const AddSalary = () => {
  const [departments, setDepartments] = useState([])
  const [department, setDepartment] = useState('')
  const [employees, setEmployees] = useState([])
  const [employee, setEmployee] = useState('')
  const [basicSalary, setBasicSalary] = useState('')
  const [allowances, setAllowances] = useState('')
  const [deductions, setDeductions] = useState('')
  const [payDate, setPayDate] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await getDepartments()
        if (res.status === 200) {
          setDepartments(res.data)
        } else {
          throw new Error('Failed to fetch departments')
        }
      } catch (error) {
        console.error(error)
        toast.error('Error fetching departments')
      }
    }
    fetchDepartments()
  }, [])

  // Fetch employees when department changes
  useEffect(() => {
    const fetchEmployees = async () => {
      if (!department) return
      try {
        const res = await getEmployeesByDepartMentId(department)
        if (res.status === 200) {
          setEmployees(res.data)
        } else {
          throw new Error('Failed to fetch employees')
        }
      } catch (error) {
        console.error(error)
        
      }
    }
    fetchEmployees()
    setEmployee('') // Reset selected employee when department changes
  }, [department])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!employee) {
      toast.warn('Please select an employee')
      return
    }

    const data = {
      employeeId: employee,
      basicSalary: parseFloat(basicSalary),
      allowances: parseFloat(allowances),
      deductions: parseFloat(deductions),
      payDate
    }

    setLoading(true)
    try {
      const res = await addSalary(data)
      if (res.status === 201) { // Assuming 201 for successful creation
        toast.success('Salary added successfully')
        resetForm()
      } else {
        throw new Error('Failed to add salary')
      }
    } catch (error) {
      console.error(error)
      toast.error('Error adding salary')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setDepartment('')
    setEmployee('')
    setBasicSalary('')
    setAllowances('')
    setDeductions('')
    setPayDate('')
  }

  return (
    <div className='p-5'>
      <h2 className='text-2xl font-semibold mb-5 text-center'>Add Salary</h2>
      <form className="flex flex-col gap-6 max-w-2xl w-full mx-auto" onSubmit={handleSubmit}>
        <div className='grid md:grid-cols-2 gap-4'>
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

          <select
            className="select select-primary w-full"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            required
          >
            <option value="" disabled>Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.userId?.name || 'Unnamed Employee'}
              </option>
            ))}
          </select>
        </div>

        <div className='grid md:grid-cols-2 gap-4'>
          <Input
            type='number'
            placeholder='Enter basic salary'
            value={basicSalary}
            setValue={setBasicSalary}
            min="0"
            required
          />
          <Input
            type='number'
            placeholder='Enter allowances'
            value={allowances}
            setValue={setAllowances}
            min="0"
            required
          />
        </div>

        <div className='grid md:grid-cols-2 gap-4'>
          <Input
            type='number'
            placeholder='Enter deductions'
            value={deductions}
            setValue={setDeductions}
            min="0"
            required
          />
          <Input
            type='date'
            value={payDate}
            setValue={setPayDate}
            required
          />
        </div>

        <Button text="Add" loading={loading} />
      </form>
    </div>
  )
}

export default AddSalary
