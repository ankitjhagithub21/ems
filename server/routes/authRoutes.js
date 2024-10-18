const express = require('express')
const { login,  verifyUser } = require('../controllers/authController')
const verifyToken = require('../middlewares/verifyToken')
const authRouter = express.Router()


authRouter.post("/login",login)
authRouter.get("/verify",verifyToken,verifyUser)

module.exports = authRouter