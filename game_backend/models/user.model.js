import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config";

const userSchema=new mongoose.Schema({

    username:{
        type:String,
        require:true,
        unique
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
})

userSchema.pre("save",async function () {
    if(!this.isModified("password"))return;
    console.log(this.password)
    this.password=await bcrypt.hash(this.password,10)

    console.log(this.password)
});

userSchema.method.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password);
    
};


userSchema.method.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email,
            password:this.password
        },
        process.env.JWT_ACCESSES_TOKEN,
        {
            expiresIn:process.env.JWT_ACCESSES_EXP,
        }
    )}
        
userSchema.method.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.WT_REFRESH_TOKEN,
        {
            expiresIn:process.env.WT_REFRESH_EXP,
        }
    )
}


export const User=new mongoose.model("User",userSchema)
