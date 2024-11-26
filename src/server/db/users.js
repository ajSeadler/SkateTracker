const db = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

const createUser = async (userData) => {
  const {
    name,
    email,
    password,
    first_name,
    last_name,
    phone_number,
    shipping_address,
    description,
  } = userData;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const {
      rows: [user],
    } = await db.query(
      `
        INSERT INTO users(name, email, password, first_name, last_name, phone_number, shipping_address, description)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (email) DO NOTHING
        RETURNING *`,
      [
        name,
        email,
        hashedPassword,
        first_name,
        last_name,
        phone_number,
        shipping_address,
        description,
      ]
    );

    return user;
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        SELECT * 
        FROM users
        WHERE email=$1;`,
      [email]
    );

    if (!user) {
      return;
    }
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserById = async (userId) => {
  try {
    const {
      rows: [user],
    } = await db.query(
      `
        SELECT *
        FROM users
        WHERE id = $1;
        `,
      [userId]
    );

    if (!user) return null;

    // Omitting password from the user object
    const sanitizedUser = { ...user };
    delete sanitizedUser.password;

    return sanitizedUser;
  } catch (error) {
    throw error;
  }
};

const getUser = async ({ email, password }) => {
  try {
    if (!email || !password) {
      throw new Error("Missing email or password");
    }

    const user = await getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const hashedPassword = user.password;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordsMatch) {
      throw new Error("Incorrect password");
    }

    // Omitting password from the user object
    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
};

const updateUserPoints = async (id, points) => {
  if (typeof points !== "number" || points < 0)
    throw new Error("Invalid points value");
  const query = "UPDATE Users SET points = points + $1 WHERE id = $2";
  await db.query(query, [points, id]);
};

const getAllUsers = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    throw error;
  }
};

const updateUserEmail = async (userId, newEmail) => {
  try {
    const {
      rows: [updatedUser],
    } = await db.query(
      `
            UPDATE users
            SET email = $2
            WHERE id = $1
            RETURNING *;
        `,
      [userId, newEmail]
    );

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const updateUserName = async (userId, newName) => {
  try {
    const {
      rows: [updatedUser],
    } = await db.query(
      `
            UPDATE users
            SET name = $2
            WHERE id = $1
            RETURNING *;
        `,
      [userId, newName]
    );

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const updateUserPassword = async (userId, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, SALT_COUNT);
  try {
    const {
      rows: [updatedUser],
    } = await db.query(
      `
            UPDATE users
            SET password = $2
            WHERE id = $1
            RETURNING id, name, email; -- Only return necessary fields
        `,
      [userId, hashedPassword]
    );

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUserEmail,
  updateUserName,
  updateUserPassword,
  updateUserPoints,
};
