const express = require("express");
const recoveriesRouter = express.Router();
const {
  getAllRecoveries,
  getAllRecoveriesByUserId,
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

module.exports = recoveriesRouter;
