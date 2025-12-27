import {asyncHandler} from "../utils/asyncHandler"
import { ApiError } from "../utils/ApiError"
import { User } from "../models/user.model"
import jwt from "jsonwebtoken"

export const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token=req.cookies?.accessToken||req.header("verified")

        if(!token){
            throw new ApiError(401,"not verified")
        }

        const decodedToken=jwt.verify(token,process.env.JWT_ACCESSES_TOKEN)

        if(!user){
            throw new ApiError(401,"invalid")
        }
        req.user=user;
        next()

        
    } catch (error) {
        throw new ApiError(401,error?.message||"invalid")
        
    }
})