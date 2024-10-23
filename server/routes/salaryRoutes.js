const express = require('express');
const verifyToken = require('../middlewares/verifyToken');
const { addSalary } = require('../controllers/salaryController');

const salaryRouter = express.Router();

salaryRouter.post('/', verifyToken, addSalary);


module.exports = salaryRouter;