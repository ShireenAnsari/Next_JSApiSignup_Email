import mongoose from 'mongoose'
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please provide a username'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'Please provide an email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide a username'],
    },
    isVerified:{
        type:Boolean,
        default:false

    },
    isAdmin:{
        type:Boolean,
        default:false

    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    VerifyToken:String,
    VerifyTokenExpiry:Date
})