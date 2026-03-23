import express from "express";
import {
  getStudentGrowth,
  getAllStudentsGrowth,
  getLeaderboard,
  getSkillBreakdown,
} from "../controllers/analyticsController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// 👨‍🎓 Student
router.get("/growth", protect, getStudentGrowth);

// 🧑‍🏫 Trainer
router.get("/all", protect, authorizeRoles("trainer"), getAllStudentsGrowth);

// 🧑‍💼 Placement
router.get("/leaderboard", protect, authorizeRoles("placement"), getLeaderboard);

// 🤖 Skills (student)
router.get("/skills", protect, getSkillBreakdown);

export default router;