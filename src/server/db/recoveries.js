const db = require("./client");

const getAllRecoveries = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM recoveries");
    return rows;
  } catch (error) {
    throw error;
  }
};

const getAllRecoveriesByUserId = async (userId) => {
  try {
    const { rows } = await db.query(
      `
      SELECT recoveries.* 
      FROM recoveries
      JOIN user_recoveries ON recoveries.recovery_id = user_recoveries.recovery_id
      WHERE user_recoveries.user_id = $1
      `,
      [userId]
    );
    return rows; // This will return an array of recovery objects associated with the user
  } catch (error) {
    throw error;
  }
};

  const addUserRecovery = async (userId, recoveryId) => {
    try {
      const query = `INSERT INTO user_recoveries (user_id, recovery_id)
      VALUES ($1, $2)
      RETURNING *;`;
      const {rows} = await db.query(query, [userId, recoveryId]);
      return rows[0];
    } catch (error) {
      console.error("Error adding recovery for user ID:", userId, error);
      throw error;
    }
  };

module.exports = {
  getAllRecoveries,
  getAllRecoveriesByUserId,
  addUserRecovery
};
