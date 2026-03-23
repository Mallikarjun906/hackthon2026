// src/routes/studentRoutes.js
import express from "express";
import { applyInternship } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/apply", protect, applyInternship);

export default router;