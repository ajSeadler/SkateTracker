const db = require("./client");

const getAllTricks = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM tricks");
    return rows; // Ensure this is an array of objects
  } catch (error) {
    throw error;
  }
};

const getAllTricksByUserId = async (userId) => {
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
    return rows; // This will return an array of trick objects associated with the user
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTricks,
  getAllTricksByUserId,
};
