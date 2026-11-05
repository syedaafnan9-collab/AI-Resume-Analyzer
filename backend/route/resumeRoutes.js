import express from "express";
import { analyzeResume } from "../controllers/resumeController.js";
import upload from "../middleware/upload.js";

const router = express.Router();
// app.use("/api/resumes", resumeRoutes);

// router.post("/analyze", upload.single("resume"), analyzeResume);
router.post(
  "/analyze",
  (req, res, next) => {
    console.log("Analyze route reached!");
    next();
  },
  upload.single("resume"),
  analyzeResume,
);

export default router;
