import axios from "axios"
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/departments`

export const getDepartments = async() => {
    const res = await axios.get(baseUrl)
    return res;
}

