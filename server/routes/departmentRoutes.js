const express = require('express')
const { addDepartment,getAllDepartments, editDepartment, getDepartmentById, deleteDepartment } = require('../controllers/departmentController')
const verifyToken = require('../middlewares/verifyToken')
const departmentRouter = express.Router()


departmentRouter.post("/",verifyToken,addDepartment)
departmentRouter.get("/",verifyToken,getAllDepartments)
departmentRouter.get("/:departmentId",verifyToken,getDepartmentById)
departmentRouter.put("/:departmentId",verifyToken,editDepartment)
departmentRouter.delete("/:departmentId",verifyToken,deleteDepartment)


module.exports = departmentRouter