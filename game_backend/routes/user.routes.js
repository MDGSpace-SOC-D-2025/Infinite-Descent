import {registerUser,loginUser,logoutUser,refreshAccessToken} from "../controllers/usr.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router=Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/logout").post(verifyJWT,logoutUser)

export default router;



// http://localhost:3001/api/users/register
// http://localhost:3001/api/users/login
// http://localhost:3001/api/users/logout
// http://localhost:3001/api/users/refresh-token