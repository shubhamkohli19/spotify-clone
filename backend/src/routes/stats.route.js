import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getAllStats } from "../controllers/stats.controller.js";

const router = Router();

router.get("/", requireAdmin, protectRoute, getAllStats);

export default router;