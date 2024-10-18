const express = require('express')
const { register, login, logout, getUser } = require('../controllers/authController')
const authRouter = express.Router()

// authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.get("/me",getUser)

module.exports = authRouter