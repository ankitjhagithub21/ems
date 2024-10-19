import axios from "axios"
const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/departments`

export const addNewDepartment = async(data) => {
    const res = await axios.post(baseUrl,data)
    return res;
}



export const getDepartments = async() => {
    const res = await axios.get(baseUrl)
    return res;
}

export const getSingleDepartment = async(id) => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res;
}


export const updateDepartment = async(id,data) => {
    const res = await axios.put(`${baseUrl}/${id}`,data)
    return res;
}

export const removeDepartment = async(id) => {
    const res = await axios.delete(`${baseUrl}/${id}`)
    return res;
}




