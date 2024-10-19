import React, { useState } from 'react'
import Input from '../common/Input'
import Textarea from '../common/Textarea'
import Button from '../common/Button'
import Heading from '../common/Heading'
import { toast } from "react-toastify"
import { addNewDepartment } from '../../api/admin/department'


const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await addNewDepartment({ departmentName, description })

      if (response.status === 201) {
        toast.success("Department added successfully.")
        setDescription('')
        setDepartmentName('')
      }

    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    } finally {
      setLoading(false)
    }



  }

  
  return (
    <div className='max-w-lg p-5  mx-auto my-12'>
      <Heading text={"Add new department"} />
      <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <Input type="text" placeholder={"Enter department name"} value={departmentName} setValue={setDepartmentName} />
        <Textarea placeholder={"Enter description"} value={description} setValue={setDescription} />
        <Button text={"Add department"} loading={loading} />
      </form>
    </div>
  )
}

export default AddDepartment
