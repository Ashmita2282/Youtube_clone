import express from "express";
const router = express.Router();
import { imageUpload, uploadFile } from "../controllers/FileUploader.js"; // Include the file extension

router.post("/upload", uploadFile); // Match function name
router.post("/img", imageUpload); // Match function name

export default router;
