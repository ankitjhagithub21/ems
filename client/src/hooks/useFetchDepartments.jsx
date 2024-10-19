import { useEffect, useState } from 'react'
import axios from 'axios'
import { getDepartments } from '../api/admin/department'
const useFetchDepartments = () => {
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getData = async () => {

            try {
                const res = await getDepartments()
                if (res.status === 200) {
                    setDepartments(res.data)
                }

            } catch (error) {
                console.log(error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])
    return { departments,setDepartments, loading, error }
}

export default useFetchDepartments
