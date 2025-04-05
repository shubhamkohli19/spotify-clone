import { Router } from "express";
import { createSong } from "../controllers/admin.controller";
import { requireAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get("/", protectRoute, requireAdmin, createSong);

export default router;