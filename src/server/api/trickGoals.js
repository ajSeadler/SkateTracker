const express = require("express");
const trickGoalsRouter = express.Router();
const { getUserTrickGoals } = require("../db/trickGoals"); // Adjust the path as needed

// Route to get trick goals by user ID
trickGoalsRouter.get("/user/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const goals = await getUserTrickGoals(userId);
    res.json(goals);
  } catch (error) {
    console.error("Error fetching user trick goals:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = trickGoalsRouter;
