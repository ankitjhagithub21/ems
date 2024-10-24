const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/multer');
const { addEmployee, getAllEmployees, deleteEmployee, getEmployeeById, editEmployee, getEmployeesByDepartMentId } = require('../controllers/employeeController');

const employeeRouter = express.Router();

employeeRouter.post('/', verifyToken, upload.single('image'), addEmployee);
employeeRouter.get('/', verifyToken, getAllEmployees);
employeeRouter.delete('/:employeeId', verifyToken, deleteEmployee);
employeeRouter.get('/:employeeId', verifyToken, getEmployeeById);
employeeRouter.put('/:id', verifyToken, upload.single('image') ,editEmployee);
employeeRouter.get('/department/:departmentId', verifyToken,getEmployeesByDepartMentId);


module.exports = employeeRouter;