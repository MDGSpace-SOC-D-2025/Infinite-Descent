import {asyncHandler} from "../utils/asyncHandler"
import {ApiError} from "../utils/ApiError"
import {ApiResponse} from "../utils/ApiResponse"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";

const generateAccessAndRefreshToken=async(userId)=>{
    try {
        const user=await UserActivation.findById(userId);

        const accessToken=user.generateAccessToken();
        const refreshToken=user.genrateRefreshToken();

        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false});

        return {accessToken,refreshToken};
        
    } catch{
        throw new ApiError(500,'token generation failed');
        
    }
};

const registerUser=asyncHandler(async(req,res)=>{
    const {email,username,password}=req.body;

    if([email,username,password].some(f=>!f?.trim())){
        throw new ApiError(400,"all firld are req")
    }

    const existedUser=await User.findOne({
        $or:[{email},{username}],
    });

    if(existedUser){
        throw new ApiError(409,"User already existed");
    }

    const user=await User.create({
        email,
        username:username.toLowerCase(),
        password,
    })

    const createdUser=await User.findById(user._id).select("-password")

    return res.status(201)
    .json(
        new ApiResponse(201,createdUser,"user is register")
    );
});

const loginUser=asyncHandler(async(res,req)=>{
    const {email,username,password}=req.body;

    if(!email &&!username){
        throw new ApiError(400,"email or username reqiored");
    }
    const user=await User.findOne({$or:[{email},{username}]});

    if(!user||!(await user.isPasswordCorrect(password))){
        throw new ApiError(401,"galat password");
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id);

    const logedInUser=await User.findById(user._id);

    const options={
        httpOnly:true,
        secure:true,
    };

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{user:logedInUser},"login ")
    )
});

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req,user._id,{
        $set:{refreshToken:undefined},
    });

    const options={
        httpOnly:true,
        secure:true,
    };

    return res
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"logged out"));

});

const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingToken=req.cookies?.refreshToken||req.body?.refreshToken;

    if(!incomingToken){
        throw new ApiError(401,"unauthorizes");
    }
    const decoded=jwt.verify(incomingToken,process.env.JWT_REFRESH_TOKEN);
    const user=await User.findById(decoded._id);

    if(!user||incomingToken !==user.refreshToken){
        throw new ApiError(401,"inavalid");
    }

    const {accessToken,refreshToken}=
    await generateAccessAndRefreshToken(user._id);

    return res
    .cookie("accessToken",accessToken,{httpOnly:true})
    .cookie("accessToken",refreshToken,{httpOnly:true})
    .json(new ApiResponse(200,{},"token refreshed"))
})

export {registerUser,loginUser,logoutUser,refreshAccessToken};



