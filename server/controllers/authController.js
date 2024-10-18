const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "user not found." })
        }


        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return res.status(404).json({ message: "Wrong email or password." })
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.status(200).json({
            message: "Login successufll.", token,
            user: {
                _id: user._id,
                role: user.role,
                name: user.name
            }
        })


    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

const logout = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

const getUser = async (req, res) => {
    try {

    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = {
    register,
    login,
    logout,
    getUser
}