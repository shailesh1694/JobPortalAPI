import express from "express"
import { getRegisterController, loginController ,updatePassword ,resetpassword} from "../controller/jobLoginController.js"
import authMiddleware from "../middleware/authMiddleware.js"
//router Object
const router = express.Router()

//route(
router.post("/register", getRegisterController)

router.post("/login", loginController)

router.post("/changepassword",authMiddleware,updatePassword)

router.post("/filldetails",authMiddleware,resetpassword)
export default router;