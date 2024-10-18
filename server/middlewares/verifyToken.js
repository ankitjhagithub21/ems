const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async(req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Token missing."})
        }
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        if(!decoded){
            return res.status(401).json({message:"Unauthorized."})
        }

        const user = await User.findById(decoded._id).select("-password")
        

        if(!user){
            return res.status(404).json({message:"user not found."})
        }
        req.user = user;

        next()
      
    }catch(error){
        return res.status(500).json({message:"Server error."})
    }
}

module.exports = verifyToken