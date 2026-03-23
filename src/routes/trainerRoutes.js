// src/routes/trainerRoutes.js
import express from "express";
import { getPending, approve } from "../controllers/trainerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/pending", protect, getPending);
router.post("/approve/:id", protect, approve);

export default router;