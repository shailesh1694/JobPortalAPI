import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { updateUserController } from "../controller/updateUserController.js";
const router = express.Router()

router.put('/update-user', authMiddleware, updateUserController)

export default router;
