import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token=req.cookies?.accessToken||req.header("verified")?.replace("berer","")

        if(!token){
            throw new ApiError(401,"not verified")
        }

        const decodedToken=jwt.verify(token,process.env.JWT_ACCESSES_TOKEN)

        const user=await User.findById(decodedToken._id).selected("-password -refreshtoken")

        if(!user){
            throw new ApiError(401,"invalid")
        }
        req.user=user;
        next()

        
    } catch (error) {
        throw new ApiError(401,error?.message||"invalid")
        
    }
})