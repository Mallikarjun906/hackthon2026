// src/routes/reportRoutes.js
import express from "express";
import { submitReport, reviewReport } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// student submits report
router.post("/submit", protect, submitReport);

// trainer reviews report
router.post("/review/:id", protect, reviewReport);

export default router; // ✅ MUST HAVE