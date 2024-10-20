const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/multer');
const { addEmployee, getAllEmployees, deleteEmployee } = require('../controllers/employeeController');

const employeeRouter = express.Router();

employeeRouter.post('/', verifyToken, upload.single('image'), addEmployee);
employeeRouter.get('/', verifyToken, getAllEmployees);
employeeRouter.delete('/:employeeId', verifyToken, deleteEmployee);

module.exports = employeeRouter;