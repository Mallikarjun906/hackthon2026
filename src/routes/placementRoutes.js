import express from "express";
import { getPendingPlacement, approvePlacement } from "../controllers/placementController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// only placement officer
router.get("/pending", protect, authorizeRoles("placement"), getPendingPlacement);
router.post("/approve/:id", protect, authorizeRoles("placement"), approvePlacement);

export default router;