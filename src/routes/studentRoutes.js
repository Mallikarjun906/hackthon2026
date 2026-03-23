import express from "express";
import { applyInternship } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// only student
router.post("/apply", protect, authorizeRoles("student"), applyInternship);

export default router;