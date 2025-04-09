import { Router } from "express";
import { protectRoute, requireAdmin } from './../middleware/auth.middleware';

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", protectRoute, getMadeForYouSongs);
router.get("/trending", getTrendingSongs);

export default router;