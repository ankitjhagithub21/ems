const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },


}, { versionKey: false, timestamps: true })

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee