const Salary = require("../models/Salary")

const addSalary = async (req, res) => {
    try {
      const {
        employeeId, basicSalary, allowances, deductions, payDate
      } = req.body;
  
      // Ensure numeric values are parsed correctly
      const totalSalary = 
        parseFloat(basicSalary) + parseFloat(allowances) - parseFloat(deductions);
  
      const newSalary = new Salary({
        employeeId,
        basicSalary: parseFloat(basicSalary),
        allowances: parseFloat(allowances),
        deductions: parseFloat(deductions),
        netSalary: totalSalary,
        payDate
      });
  
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