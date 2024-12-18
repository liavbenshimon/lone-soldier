import express from "express";
import { createEatUp, getAllEatUps, getEatUpById, updateEatUp, deleteEatUp } from "../controllers/eatupController.js";

const router = express.Router();

// Route to create a new EatUp entry
router.post("/", createEatUp);

// Route to get all EatUp entries
router.get("/", getAllEatUps);

// Route to get a specific EatUp entry by ID
router.get("/:id", getEatUpById);

// Route to update a specific EatUp entry by ID
router.put("/:id", updateEatUp);

// Route to delete a specific EatUp entry by ID
router.delete("/:id", deleteEatUp);

export default router;
