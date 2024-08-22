const db = require("./client"); // Adjust the path as needed

const getUserTrickGoals = async (userId) => {
  try {
    console.log(`Fetching trick goals for user ID: ${userId}`); // Log the userId
    const result = await db.query(
      `
      SELECT g.goal_id, g.user_id, g.trick_id, t.name AS trick_name, g.goal_description, g.target_date, g.achieved, g.created_at, g.updated_at
      FROM trick_goals g
      JOIN tricks t ON g.trick_id = t.trick_id
      WHERE g.user_id = $1
      `,
      [userId]
    );

    return result.rows;
  } catch (error) {
    console.error("Error fetching user trick goals:", error); // Log the error
    throw error;
  }
};

module.exports = {
  getUserTrickGoals,
};
