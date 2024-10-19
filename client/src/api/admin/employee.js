import axios from "axios"
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/employees`


export const addNewEmployee = async(data) => {
    const res = await axios.post(baseUrl,data)
    return res;
}



export const getEmployees = async() => {
    const res = await axios.get(baseUrl)
    return res;
}

export const getSingleEmployee = async(id) => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res;
}


export const updateEmployee = async(id,data) => {
    const res = await axios.put(`${baseUrl}/${id}`,data)
    return res;
}

export const removeEmployee = async(id) => {
    const res = await axios.delete(`${baseUrl}/${id}`)
    return res;
}




