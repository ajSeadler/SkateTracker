const db = require("./client");
const { createUser } = require("./users");
const tricksData = require("./tricksData");
const recoveriesData = require("./recoveriesdata");

const users = [
  {
    name: "aj_seadler",
    email: "aj@a.com",
    password: "pass",
    first_name: "AJ",
    last_name: "Seadler",
    phone_number: "123-456-7890",
    shipping_address: "123 Elm Street, Springfield",
    billing_address: "123 Elm Street, Springfield",
  },
  {
    name: "tonysoprano",
    email: "tonE@a.com",
    password: "pass",
    first_name: "Tony",
    last_name: "Soprano",
    phone_number: "987-654-3210",
    shipping_address: "456 Oak Avenue, Newark",
    billing_address: "456 Oak Avenue, Newark",
  },
];

const dropTables = async () => {
  try {
    await db.query(`
      DROP TABLE IF EXISTS user_tricks, tricks, user_recoveries, recoveries, users CASCADE;
    `);
  } catch (error) {
    throw error;
  }
};

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        phone_number VARCHAR(50),
        shipping_address TEXT,
        billing_address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE tricks (
        trick_id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE,
        description TEXT,
        difficulty_level VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE user_tricks (
        user_trick_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        trick_id INTEGER REFERENCES tricks(trick_id),
        learned_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE recoveries (
        recovery_id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        description TEXT,
        target_area VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE user_recoveries (
        user_recovery_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        recovery_id INTEGER REFERENCES recoveries(recovery_id),
        recovery_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (error) {
    throw error;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      const createdUser = await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        shipping_address: user.shipping_address,
        billing_address: user.billing_address,
      });

      console.log("User inserted:", createdUser);
    }
    console.log("Users inserted successfully.");
  } catch (error) {
    console.error("Error inserting users:", error);
  }
};

const insertInitialData = async () => {
  try {
    // Insert tricks
    for (const trick of tricksData) {
      await db.query(
        `
        INSERT INTO tricks(name, description, difficulty_level)
        VALUES($1, $2, $3)`,
        [trick.name, trick.description, trick.difficulty_level]
      );
    }

    // Insert recoveries
    for (const recovery of recoveriesData) {
      await db.query(
        `
        INSERT INTO recoveries(name, description, target_area)
        VALUES($1, $2, $3)`,
        [recovery.name, recovery.description, recovery.target_area]
      );
    }

    console.log("Initial data inserted successfully.");
  } catch (error) {
    console.error("Error inserting initial data:", error);
  }
};

const insertUserTricksAndRecoveries = async () => {
  try {
    // Get user IDs
    const { rows: users } = await db.query("SELECT id FROM users");
    const userIds = users.map((user) => user.id);

    // Get trick IDs
    const { rows: tricks } = await db.query("SELECT trick_id FROM tricks");
    const trickIds = tricks.map((trick) => trick.trick_id);

    // Get recovery IDs
    const { rows: recoveries } = await db.query(
      "SELECT recovery_id FROM recoveries"
    );
    const recoveryIds = recoveries.map((recovery) => recovery.recovery_id);

    // Insert user_tricks
    for (const userId of userIds) {
      for (const trickId of trickIds) {
        await db.query(
          `
          INSERT INTO user_tricks(user_id, trick_id, learned_date)
          VALUES($1, $2, NOW())`,
          [userId, trickId]
        );
      }
    }

    // Insert user_recoveries
    for (const userId of userIds) {
      for (const recoveryId of recoveryIds) {
        await db.query(
          `
          INSERT INTO user_recoveries(user_id, recovery_id, recovery_date)
          VALUES($1, $2, NOW())`,
          [userId, recoveryId]
        );
      }
    }

    console.log("User tricks and recoveries inserted successfully.");
  } catch (error) {
    console.error("Error inserting user tricks and recoveries:", error);
  }
};

const seedDatabase = async () => {
  try {
    await db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertInitialData();
    await insertUserTricksAndRecoveries();
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await db.end();
  }
};

seedDatabase();
