const express = require('express')
const { addDepartment,getAllDepartments } = require('../controllers/departmentController')
const verifyToken = require('../middlewares/verifyToken')
const departmentRouter = express.Router()


departmentRouter.post("/",verifyToken,addDepartment)
departmentRouter.get("/",getAllDepartments)


module.exports = departmentRouter