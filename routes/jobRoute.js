import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import { jobController, getAllJobController, getupdatejobcontroller,deleteJobcontroller ,aggregatecontroller} from "../controller/jobController.js";
const router = express.Router()

router.post("/create-job", authMiddleware, jobController)
router.get("/get-job", authMiddleware, getAllJobController)
router.put("/update-job/:id", authMiddleware, getupdatejobcontroller)
router.delete("/delete-job/:id",authMiddleware,deleteJobcontroller)
router.get("/job-states",authMiddleware,aggregatecontroller)


export default router;