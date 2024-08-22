const db = require("./client");

// Retrieve all tricks from the database
const getAllTricks = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM tricks");
    return rows; // Returns an array of trick objects
  } catch (error) {
    console.error("Error fetching all tricks:", error);
    throw error;
  }
};

// Retrieve all tricks for a specific user
const getAllTricksByUserId = async (userId) => {
  if (isNaN(userId)) {
    throw new Error("Invalid user ID");
  }

  try {
    const { rows } = await db.query(
      `
      SELECT tricks.* 
      FROM tricks
      JOIN user_tricks ON tricks.trick_id = user_tricks.trick_id
      WHERE user_tricks.user_id = $1
      `,
      [userId]
    );
    return rows; // Returns an array of trick objects associated with the user
  } catch (error) {
    console.error("Error fetching tricks for user:", error);
    throw error;
  }
};

// Verify if a trick exists for a specific user
const verifyTrickForUser = async (userId, trickId) => {
  if (isNaN(userId) || isNaN(trickId)) {
    throw new Error("Invalid user ID or trick ID");
  }

  try {
    const { rowCount } = await db.query(
      `
      SELECT 1
      FROM user_tricks
      WHERE user_id = $1 AND trick_id = $2
      `,
      [userId, trickId]
    );
    return rowCount > 0;
  } catch (error) {
    console.error("Error verifying trick for user:", error);
    throw error;
  }
};

// Update the deleteTrick function
const deleteTrick = async (userId, trickId) => {
  try {
    if (isNaN(userId) || isNaN(trickId)) {
      throw new Error("Invalid user ID or trick ID");
    }

    const result = await db.query(
      `
      DELETE FROM user_tricks
      WHERE user_id = $1 AND trick_id = $2
      RETURNING *;
      `,
      [userId, trickId]
    );

    return result.rowCount > 0; // Return true if a row was deleted
  } catch (error) {
    console.error("Error deleting trick for user ID:", userId, error);
    throw error;
  }
};

// Add a trick to a user
const addUserTrick = async (userId, trickId) => {
  try {
    const query = `
      INSERT INTO user_tricks (user_id, trick_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const { rows } = await db.query(query, [userId, trickId]); // Use both userId and trickId
    return rows[0]; // Return the inserted row
  } catch (error) {
    console.error("Error adding trick for user ID:", userId, error);
    throw error;
  }
};

module.exports = {
  getAllTricks,
  getAllTricksByUserId,
  deleteTrick,
  addUserTrick,
};
