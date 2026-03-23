import express from "express";
import { generateCertificate } from "../controllers/certificateController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// student or placement can generate
router.get("/:id", protect, generateCertificate);

export default router;