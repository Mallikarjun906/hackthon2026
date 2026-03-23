import express from "express";
import { getPending, approve } from "../controllers/trainerController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// only trainer can access
router.get("/pending", protect, authorizeRoles("trainer"), getPending);
router.post("/approve/:id", protect, authorizeRoles("trainer"), approve);

export default router;