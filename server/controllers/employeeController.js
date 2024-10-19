const Employee = require("../models/Employee")
const User = require("../models/User")
const bcryptjs = require('bcryptjs')
const validator = require('validator')
const { uploadImage } = require("../utils/cloudinary")

const addEmployee = async (req, res) => {
    try {
        const { 
            name,
            email, 
            employeeId,
            dob,
            gender,
            maritalStatus,  
            designation,
            department,
            salary,         
            password,
            role 
        } = req.body;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already registered as employee." });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email address." });
        }

        // Validate password strength
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Please set a strong password." });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        let result;
        if (req.file) {
            result = await uploadImage(req.file.path);
            if (!result) {
                return res.status(400).json({ message: "Image upload failed." });
            }
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: result?.secureUrl || '',  
            publicId: result?.publicId || ''        
        });

        const savedUser = await newUser.save();

        if (savedUser) {
            
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
        }
    } catch (error) {
        
        return res.status(500).json({ message: "Server error" });
    }
};


const getAllEmployees = async (req, res) => {
    try {
        

        const employees = await Employee.find()

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

        const employee = await employee.findByIdAndDelete(employeeId)

        if (!employee) {
            return res.status(404).json({ message: "employee not found." })

        }
        return res.status(200).json({message:"employee deleted."})


    } catch (error) {
        return res.status(500).json({ message: "server error" })
    }
}




module.exports = {
    addEmployee,
    getAllEmployees,
    getEmployeeById,
    editEmployee,
    deleteEmployee
}