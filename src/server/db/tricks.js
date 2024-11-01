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
  const query = `
    SELECT 
      t.trick_id,
      t.name,
      t.category,
      t.difficulty_level,
      ut.status,
      t.created_at,
      t.updated_at
    FROM 
      tricks t
    JOIN 
      user_tricks ut ON t.trick_id = ut.trick_id
    WHERE 
      ut.user_id = $1
  `;

  try {
    const { rows } = await db.query(query, [userId]);
    return rows;
  } catch (error) {
    console.error("Error fetching tricks by user ID:", error);
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


const updateTrickStatus = async (userId, trickId, status) => {
  try {
    if (isNaN(userId) || isNaN(trickId)) {
      throw new Error("Invalid user ID or trick ID");
    }

    // Update the trick status in the user_tricks table
    const updateQuery = `
      UPDATE user_tricks
      SET status = $3
      WHERE user_id = $1 AND trick_id = $2
      RETURNING *;
    `;
    const result = await db.query(updateQuery, [userId, trickId, status]);

    return result.rowCount > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error updating trick status:", error);
    throw error;
  }
};

const deleteTrick = async (userId, trickId) => {
  try {
    if (isNaN(userId) || isNaN(trickId)) {
      throw new Error("Invalid user ID or trick ID");
    }

    // Delete the trick from the user_tricks table
    const deleteQuery = `
      DELETE FROM user_tricks
      WHERE user_id = $1 AND trick_id = $2
      RETURNING *;
    `;
    const deleteResult = await db.query(deleteQuery, [userId, trickId]);

    if (deleteResult.rowCount > 0) {
      // Decrement the user's points if the trick was successfully deleted
      const updatePointsQuery = `
        UPDATE users
        SET points = points - 1
        WHERE id = $1
        RETURNING points;
      `;
      const pointsResult = await db.query(updatePointsQuery, [userId]);

      return {
        success: true,
        points: pointsResult.rows[0].points, // Return the updated points
      };
    } else {
      // If no row was deleted, return success as false
      return { success: false };
    }
  } catch (error) {
    console.error("Error deleting trick for user ID:", userId, error);
    throw error;
  }
};


// Add a trick to a user
// Add a trick to a user and award points
const addUserTrick = async (userId, trickId) => {
  try {
    // Insert the trick into the user_tricks table
    const insertQuery = `
      INSERT INTO user_tricks (user_id, trick_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const insertResult = await db.query(insertQuery, [userId, trickId]);

    // Award a point to the user
    const updatePointsQuery = `
      UPDATE users
      SET points = points + 1
      WHERE id = $1
      RETURNING points;
    `;
    const pointsResult = await db.query(updatePointsQuery, [userId]);

    return {
      trick: insertResult.rows[0], // Return the inserted trick
      points: pointsResult.rows[0].points // Return the updated points
    };
  } catch (error) {
    console.log ("points added")
    console.error("Error adding trick for user ID:", userId, error);
    throw error;
  }
};


module.exports = {
  getAllTricks,
  getAllTricksByUserId,
  deleteTrick,
  addUserTrick,
  updateTrickStatus
};
