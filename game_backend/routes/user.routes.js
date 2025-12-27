import {registerUser,loginUser,logoutUser,refreshAccessToken} from "../controllers/usr.controller";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares";

const router=Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(verifyJWT,refreshAccessToken)
router.route("/logout").post(verifyJWT,logoutUser)

// http://localhost:3001/register