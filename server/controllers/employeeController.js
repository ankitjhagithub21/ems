const Employee = require("../models/Employee")
const User = require("../models/User")
const bcryptjs = require('bcryptjs')
const { uploadImage, deleteImage } = require("../utils/cloudinary")


const addEmployee = async (req, res) => {
    try {
        const {
            name, email, employeeId, dob, gender, maritalStatus,
            designation, department, salary, password, role
        } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already registered as employee.' });
        }

     
        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Upload profile image (if provided)
        let imageResult = {};
        if (req.file) {
            imageResult = await uploadImage(req.file.path);
            if (!imageResult) {
                return res.status(400).json({ message: 'Image upload failed.' });
            }
        }

        // Create new User
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: imageResult.secureUrl || '',
            publicId: imageResult.publicId || ''
        });

        const savedUser = await newUser.save();

        // Create new Employee entry
        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary
        });

        const savedEmployee = await newEmployee.save();
        return res.status(201).json(savedEmployee);

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};





const getAllEmployees = async (req, res) => {
    try {
        

        const employees = await Employee.find().populate({
            path:"userId",
            select:"name profileImage"
        }).populate({
            path:"department",
            select:"departmentName"
        })

        if (!employees) {
            return res.status(400).json({ message: "No employee found." })

        }

        return res.status(200).json(employees)


    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const { employeeId } = req.params;

        const employee = await employee.findById(employeeId)

        if (!employee) {
            return res.status(404).json({ message: "employee not found." })

        }
        return res.status(200).json(employee)


    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}

const editEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { employeeName, description } = req.body;

        // Check if all required fields are provided
        if (!employeeName || !description) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Update the employee and return the new version
        const employee = await employee.findByIdAndUpdate(
            employeeId,
            {
                $set: {
                    employeeName,
                    description,
                },
            },
            { new: true }
        );

        if (!employee) {
            return res.status(404).json({ message: "employee not found." });
        }

        return res.status(200).json(employee);
    } catch (error) {
        console.error("Error updating employee:", error); // Log the error for debugging
        return res.status(500).json({ message: "Server error." });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;

        // Find and delete employee by ID
        const employee = await Employee.findByIdAndDelete(employeeId);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found." });
        }

        // Find the associated user (assuming `userId` is stored in employee)
        const user = await User.findByIdAndDelete(employee.userId);

        if (user && user.publicId) {
            // Delete the user's profile image from Cloudinary
            await deleteImage(user.publicId);
        }

        return res.status(200).json({ message: "Employee deleted successfully." });

    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};





module.exports = {
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    editEmployee,
    deleteEmployee
}