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

module.exports = {
  getAllRecoveries,
  getAllRecoveriesByUserId,
};
