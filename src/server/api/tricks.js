const express = require("express");
const { requireUser } = require("./utils");
const {
  getAllTricksByUserId,
  getAllTricks,
  deleteTrick,
  addUserTrick,
} = require("../db");
const tricksRouter = express.Router();

// GET /api/tricks - Fetch all tricks (no authentication needed)
tricksRouter.get("/", async (req, res) => {
  try {
    const tricks = await getAllTricks();
    res.json(tricks);
  } catch (error) {
    console.error("Error fetching all tricks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/tricks/user - Fetch tricks for the authenticated user (authentication required)
tricksRouter.get("/user", requireUser, async (req, res) => {
  try {
    const tricks = await getAllTricksByUserId(req.user.id);
    res.json(tricks);
  } catch (error) {
    console.error("Error fetching tricks for user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

tricksRouter.post("/user/add", requireUser, async (req, res) => {
  const { trickId } = req.body;

  console.log("Adding trick - User ID:", req.user.id, "Trick ID:", trickId); // Debugging information

  if (isNaN(trickId)) {
    return res.status(400).json({ error: "Invalid trick ID" });
  }

  try {
    // Pass the current date to ensure that the server sets the created_at timestamp
    const result = await addUserTrick(req.user.id, trickId, new Date());
    res.json({ message: "Trick added successfully", data: result });
  } catch (error) {
    console.error("Error adding trick:", error);
    if (error.message.includes("already associated")) {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

tricksRouter.delete("/user/:trickId", requireUser, async (req, res) => {
  const { trickId } = req.params;

  if (isNaN(trickId)) {
    return res.status(400).json({ error: "Invalid trick ID" });
  }

  try {
    const success = await deleteTrick(req.user.id, trickId);
    console.log("Delete success:", success);
    if (success) {
      res.json({ message: "Trick deleted successfully" });
    } else {
      res.status(404).json({ error: "Trick not found for this user" });
    }
  } catch (error) {
    console.error("Error deleting trick:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = tricksRouter;
