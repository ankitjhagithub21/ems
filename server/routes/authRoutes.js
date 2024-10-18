const express = require('express')
const { register, login, logout, getUser, verifyUser } = require('../controllers/authController')
const authRouter = express.Router()

// authRouter.post("/register",register)
authRouter.post("/login",login)
// authRouter.get("/logout",logout)
authRouter.get("/verify",verifyUser)

module.exports = authRouter