// src/routes/placementRoutes.js
import express from "express";
import { getPendingPlacement, approvePlacement } from "../controllers/placementController.js";

const router = express.Router();

// GET pending approvals
router.get("/pending", getPendingPlacement);

// POST approve internship
router.post("/approve/:id", approvePlacement);

export default router;