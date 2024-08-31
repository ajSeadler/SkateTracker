const express = require("express");
const recoveriesRouter = express.Router();
const { requireUser } = require("./utils");
const {
  getAllRecoveries,
  getAllRecoveriesByUserId,
  addUserRecovery
} = require("../db/recoveries");

// Route to get all recoveries
recoveriesRouter.get("/", async (req, res, next) => {
  try {
    const recoveries = await getAllRecoveries();
    res.send({
      recoveries,
    });
  } catch (error) {
    next(error);
  }
});

// Route to get recoveries by user ID
recoveriesRouter.get("/user/:userId", async (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const recoveries = await getAllRecoveriesByUserId(userId);
    res.json(recoveries);
  } catch (error) {
    next(error);
  }
});

// Route to add a recovery for a user
recoveriesRouter.post("/user/add", requireUser, async (req, res) => {
  const { recoveryId } = req.body;

  console.log("Adding recovery - User ID:", req.user.id, "Recovery ID:", recoveryId);

  if (isNaN(recoveryId)) {
    return res.status(400).json({ error: "Invalid recovery ID" });
  }

  try {
    const result = await addUserRecovery(req.user.id, recoveryId);
    res.json({ message: "Recovery added successfully", data: result });
  } catch (error) {
    console.error("Error adding recovery:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = recoveriesRouter;
