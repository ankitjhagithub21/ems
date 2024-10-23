const Salary = require("../models/Salary")

const addSalary = async (req, res) => {
    try {
        const {
           employeeId,basicSalary,allowances, deductions,payDate
        } = req.body;

        const totalSalary = basicSalary + allowances - deductions
     
        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary:totalSalary,
            payDate
        })
       
        const savedSalary = await newSalary.save();
        return res.status(201).json(savedSalary);

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    addSalary
}