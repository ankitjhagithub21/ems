import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from "axios"
import { setLoading, setUser } from '../redux/slices/authSlice';


const useFetchUser = () => {
    const dispatch = useDispatch()

    useEffect(() => {

        const getUser = async() => {
            dispatch(setLoading(true))
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`)
                dispatch(setUser(res.data.user))
            } catch (error) {
                console.log(error)
                dispatch(setUser(null))
            }finally{
                dispatch(setLoading(false))
            }
        }
        getUser()
    }, [])
}

export default useFetchUser
