import express from "express";
import { getStudentGrowth } from "../controllers/analyticsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// student dashboard chart
router.get("/growth", protect, getStudentGrowth);

export default router;