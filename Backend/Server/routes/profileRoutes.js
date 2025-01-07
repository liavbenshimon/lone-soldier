import express from "express";
import { updateProfile, getProfile } from "../controllers/profileController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// All profile routes require authentication
router.use(verifyToken);

router.get("/:id", getProfile);

router.put("/:id", updateProfile);

export default router;
