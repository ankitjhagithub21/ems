const Department = require("../models/Department")

const addDepartment = async (req, res) => {
    try {
        const { departmentName, description } = req.body;

        const newDepartment = new Department({
            departmentName,
            description
        })

        const savedDepartment = await newDepartment.save();

        return res.status(201).json(savedDepartment)

    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}

const getAllDepartments = async (req, res) => {
    try {
        const { departmentName, description } = req.body;

        const departments = await Department.find()

        if (!departments || departments.length == 0) {
            return res.status(400).json({ message: "No department found." })

        }

        return res.status(200).json(departments)


    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}

const editDepartment = async (req, res) => {
    try {
        const { departmentId } = req.params;
        const { departmentName, description } = req.body;

        // Check if all required fields are provided
        if (!departmentName || !description) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Update the department and return the new version
        const department = await Department.findByIdAndUpdate(
            departmentId,
            {
                $set: {
                    departmentName,
                    description,
                },
            },
            { new: true }
        );

        if (!department) {
            return res.status(404).json({ message: "Department not found." });
        }

        return res.status(200).json(department);
    } catch (error) {
        console.error("Error updating department:", error); // Log the error for debugging
        return res.status(500).json({ message: "Server error." });
    }
};



module.exports = {
    addDepartment,
    getAllDepartments,
    editDepartment
}