const db = require("./client");

const getAllRecoveries = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM recoveries");
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRecoveries,
};
