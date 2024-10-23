import axios from "axios"
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/salaries`


export const addSalary = async(data) =>{
    const res = await axios.post(`${baseUrl}`,data)
    return res;
}

