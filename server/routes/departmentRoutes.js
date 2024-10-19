const express = require('express')
const { addDepartment,getAllDepartments, editDepartment } = require('../controllers/departmentController')
const verifyToken = require('../middlewares/verifyToken')
const departmentRouter = express.Router()


departmentRouter.post("/",verifyToken,addDepartment)
departmentRouter.get("/",verifyToken,getAllDepartments)
departmentRouter.put("/:departmentId",verifyToken,editDepartment)


module.exports = departmentRouter