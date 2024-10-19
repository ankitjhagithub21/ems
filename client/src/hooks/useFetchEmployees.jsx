import { useEffect, useState } from 'react'
import { getEmployees } from '../api/admin/employee'


const useFetchEmployees = () => {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getData = async () => {

            try {
                const res = await getEmployees()
                if (res.status === 200) {
                    setEmployees(res.data)
                }

            } catch (error) {
                console.log(error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])
    return { employees, setEmployees, loading, error }
}

export default useFetchEmployees
