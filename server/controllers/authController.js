const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validator = require("validator")

const register = async (req, res) => {
    try {
        const { name, email, password, role, profileImage } = req.body;

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "Email already exist." })
        }

        //Email validation
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter valid email address." })
        }

        //password validation

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Please enter strong password." })
        }


        const hashedPassword = await bcryptjs.hash(password, 10)




        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage
        })

        await newUser.save()

        res.status(201).json({ message: "Account created." })


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

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 1 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: `Welcome back ${user.name}`,
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

const verifyUser = async (req, res) => {
    return res.status(200).json({user:req.user})
}

module.exports = {
    register,
    login,
    logout,
    verifyUser
}