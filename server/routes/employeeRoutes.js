const express = require('express')
const { addEmployee,getAllEmployees, editEmployee, getEmployeeById, deleteEmployee } = require('../controllers/employeeController')
const verifyToken = require('../middlewares/verifyToken')
const upload = require('../middlewares/multer')
const employeeRouter = express.Router()


employeeRouter.post("/",verifyToken,upload.single('image') ,addEmployee)
employeeRouter.get("/",verifyToken,getAllEmployees)
employeeRouter.get("/:employeeId",verifyToken,getEmployeeById)
employeeRouter.put("/:employeeId",verifyToken,editEmployee)
employeeRouter.delete("/:employeeId",verifyToken,deleteEmployee)


module.exports = employeeRouter