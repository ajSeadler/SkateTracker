const express = require("express");
const recoveriesRouter = express.Router();
const { getAllRecoveries } = require("../db/recoveries");

// Route to get all recoveries
recoveriesRouter.get("/", async (req, res, next) => {
  try {
    const recoveries = await getAllRecoveries();
    res.send({
      recoveries,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = recoveriesRouter;
