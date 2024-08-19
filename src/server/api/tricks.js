// api/tricks.js
const express = require("express");
const { getAllTricksByUserId, getAllTricks } = require("../db");
const tricksRouter = express.Router();

// GET /api/tricks - Fetch all tricks
tricksRouter.get("/", async (req, res) => {
  try {
    const tricks = await getAllTricks(); // Fetch all tricks from the database
    res.json(tricks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/tricks/user/:userId - Fetch tricks by user ID
tricksRouter.get("/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const tricks = await getAllTricksByUserId(userId);
    res.json(tricks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = tricksRouter;
