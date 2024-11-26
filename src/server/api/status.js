const express = require("express");
const statusRouter = express.Router();
const {
  getAllStatuses,
  postStatus,
  deleteStatus,
  getStatusesByUserId,
} = require("../db/status");
const { requireUser, isAdmin, requiredNotSent } = require("./utils");

// Configure Multer for file upload

// Route to get all statuses (no authentication required)
statusRouter.get("/", async (req, res, next) => {
  try {
    const statuses = await getAllStatuses();
    res.send({
      statuses,
    });
  } catch (error) {
    next({ name: error.name, message: error.message });
  }
});

// Route to post a new status (requires user to be logged in)
statusRouter.post("/", requireUser, async (req, res, next) => {
  const { content, media_url } = req.body;
  const { id: user_id } = req.user;

  if (!content) {
    return next({
      name: "MissingContentError",
      message: "Status content is required",
    });
  }

  try {
    const newStatus = await postStatus(user_id, content, media_url);
    res.status(201).send({
      message: "Status posted successfully",
      newStatus,
    });
  } catch (error) {
    next({ name: error.name, message: error.message });
  }
});

// Route to delete a status (requires user to be logged in)
statusRouter.delete("/:statusId", requireUser, async (req, res, next) => {
  const { statusId } = req.params;
  const { id: user_id } = req.user;

  try {
    const deletedStatus = await deleteStatus(statusId, user_id);

    if (!deletedStatus) {
      return next({
        name: "NotFoundError",
        message: "Status not found or user is not authorized to delete it",
      });
    }

    res.send({
      message: "Status deleted successfully",
      deletedStatus,
    });
  } catch (error) {
    next({ name: error.name, message: error.message });
  }
});

// Route to get all statuses for a specific user (requires user to be logged in)
statusRouter.get("/user/:userId", requireUser, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const statuses = await getStatusesByUserId(userId);
    if (statuses.length === 0) {
      return res.status(404);
    }

    res.send({ statuses });
  } catch (error) {
    next({ name: "FetchError", message: "Could not fetch statuses for user" });
  }
});

module.exports = statusRouter;
