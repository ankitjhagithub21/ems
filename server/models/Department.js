const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    departmentName:{type:String,required:true},
    description:{type:String,required:true},
   
},{versionKey:false,timestamps:true})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department