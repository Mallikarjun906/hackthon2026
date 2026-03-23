import express from "express";
import { submitReport, reviewReport } from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// student submits report
router.post("/submit", protect, authorizeRoles("student"), submitReport);

// trainer reviews
router.post("/review/:id", protect, authorizeRoles("trainer"), reviewReport);

export default router;