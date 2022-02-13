const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    fname:{
        type:String,
        required:true,
        min:6,
        max:255,
    },
    lname:{
        type:String,
        required:true,
        max:255,
        min:6,
    },
    email:{
        type:String,
        required:true,
        max:255,
        min:6,
    },
    password:{
        type:String,
        required:true,
        max:1024,
        min:6,
    },
    isActive:{
        type:Boolean,
        default:false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    verificationToken: String,
    token:{
        type:String,
        required:false,
    }
}, {timestamps:true});

var user = mongoose.model('User',userSchema);
module.exports = user;