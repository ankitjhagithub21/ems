const Department = require("../models/Department")

const addDepartment = async(req,res) =>{
    try{
        const {departmentName,description} = req.body;

        const newDepartment = new Department({
            departmentName,
            description
        })

        const savedDepartment = await newDepartment.save();

        return res.status(201).json(savedDepartment)

    }catch(error){
        return res.status(500).json({message:"server error"})
    }
}   

const getAllDepartments = async(req,res) =>{
    try{
        const {departmentName,description} = req.body;

        const departments = await Department.find()

        if(!departments || departments.length==0){
            return res.status(400).json({message:"No department found."})

        }

        return res.status(200).json(departments)


    }catch(error){
        return res.status(500).json({message:"server error"})
    }
}

module.exports = {
    addDepartment,
    getAllDepartments
}