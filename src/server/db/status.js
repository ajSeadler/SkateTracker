const db = require("./client");

// Function to get all statuses from the database
const getAllStatuses = async () => {
  try {
    const result = await db.query(`
      SELECT statuses.id, users.name AS username, statuses.content, statuses.media_url, statuses.created_at
      FROM statuses
      JOIN users ON statuses.user_id = users.id
      ORDER BY statuses.created_at DESC;
    `);
    return result.rows;
  } catch (error) {
    console.error("Error fetching statuses:", error);
    throw error;
  }
};

// Function to post a new status
const postStatus = async (user_id, content, media_url = null) => {
  try {
    const result = await db.query(
      `
      INSERT INTO statuses(user_id, content, media_url)
      VALUES($1, $2, $3)
      RETURNING id, user_id, content, media_url, created_at;
      `,
      [user_id, content, media_url]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error posting status:", error);
    throw error;
  }
};

// Function to delete a status
const deleteStatus = async (status_id, user_id) => {
  try {
    const result = await db.query(
      `
      DELETE FROM statuses
      WHERE id = $1 AND user_id = $2
      RETURNING id, user_id, content, media_url, created_at;
      `,
      [status_id, user_id]
    );

    if (result.rowCount === 0) {
      throw new Error(
        "Status not found or you do not have permission to delete it."
      );
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error deleting status:", error);
    throw error;
  }
};

// Function to get statuses by user ID
const getStatusesByUserId = async (userId) => {
  try {
    const query = `
      SELECT statuses.id, users.name AS username, statuses.content, statuses.media_url, statuses.created_at
      FROM statuses
      JOIN users ON statuses.user_id = users.id
      WHERE statuses.user_id = $1
      ORDER BY statuses.created_at DESC;
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching statuses by user ID:", error);
    throw error;
  }
};

module.exports = {
  getAllStatuses,
  postStatus,
  deleteStatus,
  getStatusesByUserId,
};
