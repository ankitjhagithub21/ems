const express = require('express')
const { login,  verifyUser, logout } = require('../controllers/authController')
const verifyToken = require('../middlewares/verifyToken')
const authRouter = express.Router()


authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.get("/verify",verifyToken,verifyUser)

module.exports = authRouter