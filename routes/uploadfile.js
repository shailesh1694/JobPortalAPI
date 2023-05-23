import express from "express";
import multer from "multer";
import {upload,uploadcontroller} from "../controller/uploadController.js";

const router = express.Router()


router.post("/upload",upload.single("upload_file"), uploadcontroller)

export default router;