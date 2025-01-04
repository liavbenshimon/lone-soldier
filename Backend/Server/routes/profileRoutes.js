import express from "express";
import { updateProfile, getProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/:id", getProfile);

router.put("/:id", updateProfile);

export default router;
