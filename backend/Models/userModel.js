const mongoose = require("mongoose");

const UserStatus = Object.freeze({
    AVAILABLE: 'AVAILABLE',
    BUSY: 'BUSY'
});

const userSchema = new mongoose.Schema({
    name:{type: String, required: true, minlength : 3, maxlength: 30},
    email:{type: String, required: true,minlength: 3,maxlength: 200, unique: true,},
    password: {type: String,required: true,minlength: 3,maxlength: 1024},
    status: { type: String, enum: ['AVAILABLE', 'BUSY'], default: 'AVAILABLE' }},
{
    timestamps: true,
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;