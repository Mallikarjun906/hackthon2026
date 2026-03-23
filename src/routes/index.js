import express from "express";

import authRoutes from "./authRoutes.js";
import studentRoutes from "./studentRoutes.js";
import trainerRoutes from "./trainerRoutes.js";
import placementRoutes from "./placementRoutes.js";
import reportRoutes from "./reportRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/student", studentRoutes);
router.use("/trainer", trainerRoutes);
router.use("/placement", placementRoutes);
router.use("/reports", reportRoutes);

export default router;