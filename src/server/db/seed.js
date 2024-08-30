const db = require("./client");
const { createUser } = require("./users");
const tricksData = require("./tricksData");
const recoveriesData = require("./recoveriesdata");

// Sample users
const users = [
  {
    name: "speedD3mon69",
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
  {
    name: "shredMaster42",
    email: "shredder@x.com",
    password: "pass123",
    first_name: "Jake",
    last_name: "Wheeler",
    phone_number: "555-789-1234",
    shipping_address: "789 Pine Lane, Boulder",
    billing_address: "789 Pine Lane, Boulder",
  },
  {
    name: "flipKing77",
    email: "flipking@b.com",
    password: "pass456",
    first_name: "Ryan",
    last_name: "Carter",
    phone_number: "555-321-9876",
    shipping_address: "321 Maple Road, Portland",
    billing_address: "321 Maple Road, Portland",
  },
  {
    name: "ollieQueen90",
    email: "ollie@c.com",
    password: "pass789",
    first_name: "Sarah",
    last_name: "Hill",
    phone_number: "555-654-4321",
    shipping_address: "654 Cedar Street, Denver",
    billing_address: "654 Cedar Street, Denver",
  },
  {
    name: "grindMachineX",
    email: "grinder@d.com",
    password: "pass101",
    first_name: "Lucas",
    last_name: "Turner",
    phone_number: "555-876-5432",
    shipping_address: "876 Birch Avenue, Austin",
    billing_address: "876 Birch Avenue, Austin",
  },
  {
    name: "sk8rboi23",
    email: "sk8r@e.com",
    password: "pass202",
    first_name: "Emily",
    last_name: "Moore",
    phone_number: "555-432-1987",
    shipping_address: "432 Poplar Drive, Miami",
    billing_address: "432 Poplar Drive, Miami",
  },
  {
    name: "railSlide99",
    email: "rail@f.com",
    password: "pass303",
    first_name: "David",
    last_name: "Johnson",
    phone_number: "555-345-6789",
    shipping_address: "345 Spruce Lane, Seattle",
    billing_address: "345 Spruce Lane, Seattle",
  },
  {
    name: "kickFlipQueen",
    email: "kflip@h.com",
    password: "pass404",
    first_name: "Mia",
    last_name: "Anderson",
    phone_number: "555-987-2345",
    shipping_address: "987 Willow Way, Chicago",
    billing_address: "987 Willow Way, Chicago",
  },
  {
    name: "boardMaster88",
    email: "board@i.com",
    password: "pass505",
    first_name: "Chris",
    last_name: "Davis",
    phone_number: "555-789-0123",
    shipping_address: "789 Ash Street, San Francisco",
    billing_address: "789 Ash Street, San Francisco",
  },
  {
    name: "grindGuru77",
    email: "grindguru@j.com",
    password: "pass606",
    first_name: "Sophia",
    last_name: "Martinez",
    phone_number: "555-123-0987",
    shipping_address: "123 Redwood Lane, Los Angeles",
    billing_address: "123 Redwood Lane, Los Angeles",
  },
  {
    name: "popShuvitPro",
    email: "popshuv@k.com",
    password: "pass707",
    first_name: "Ethan",
    last_name: "Garcia",
    phone_number: "555-234-5678",
    shipping_address: "234 Elm Drive, San Diego",
    billing_address: "234 Elm Drive, San Diego",
  },
];

const dropTables = async () => {
  try {
    await db.query(`
      DROP TABLE IF EXISTS trick_goals, recovery_goals, user_tricks, tricks, user_recoveries, recoveries, users CASCADE;
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
        category VARCHAR(50),
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

      CREATE TABLE trick_goals (
        goal_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        trick_id INTEGER REFERENCES tricks(trick_id),
        goal_description TEXT,
        target_date TIMESTAMP,
        achieved BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE recovery_goals (
        goal_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        recovery_id INTEGER REFERENCES recoveries(recovery_id),
        goal_description TEXT,
        target_date TIMESTAMP,
        achieved BOOLEAN DEFAULT FALSE,
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
        INSERT INTO tricks(name, description, difficulty_level, category)
        VALUES($1, $2, $3, $4)`,
        [trick.name, trick.description, trick.difficulty_level, trick.category]
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

    // Get all trick IDs
    const { rows: tricks } = await db.query("SELECT trick_id FROM tricks");
    const trickIds = tricks.map((trick) => trick.trick_id);

    // Select a random sample of 5 tricks
    const selectedTrickIds = trickIds
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    // Get recovery IDs
    const { rows: recoveries } = await db.query(
      "SELECT recovery_id FROM recoveries"
    );
    const recoveryIds = recoveries.map((recovery) => recovery.recovery_id);

    const selectedRecoveryIds = recoveryIds
      .sort(() => 0.5 - Math.random())
      .slice(0, 0);

    // Insert user_tricks with only 5 selected tricks
    for (const userId of userIds) {
      for (const trickId of selectedTrickIds) {
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
      for (const recoveryId of selectedRecoveryIds) {
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

const insertTrickGoals = async () => {
  try {
    // Example goals
    const goals = [
      {
        user_id: 1,
        trick_id: 7,
        goal_description: "Master this trick by end of the month.",
        target_date: "2024-09-01",
      },
      {
        user_id: 1,
        trick_id: 2,
        goal_description:
          "Improve performance of this trick. (Back foot catch).",
        target_date: "2024-09-15",
      },
      {
        user_id: 1,
        trick_id: 4,
        goal_description: "Improve performance of this trick.",
        target_date: "2024-09-15",
      },
    ];

    for (const goal of goals) {
      await db.query(
        `
        INSERT INTO trick_goals(user_id, trick_id, goal_description, target_date)
        VALUES($1, $2, $3, $4)`,
        [goal.user_id, goal.trick_id, goal.goal_description, goal.target_date]
      );
    }

    console.log("Trick goals inserted successfully.");
  } catch (error) {
    console.error("Error inserting trick goals:", error);
  }
};

const insertRecoveryGoals = async () => {
  try {
    // Example goals
    const goals = [
      {
        user_id: 1,
        recovery_id: 1,
        goal_description: "Complete recovery exercises by next month.",
        target_date: "2024-09-01",
      },
      {
        user_id: 2,
        recovery_id: 2,
        goal_description: "Improve recovery process efficiency.",
        target_date: "2024-09-15",
      },
    ];

    for (const goal of goals) {
      await db.query(
        `
        INSERT INTO recovery_goals(user_id, recovery_id, goal_description, target_date)
        VALUES($1, $2, $3, $4)`,
        [
          goal.user_id,
          goal.recovery_id,
          goal.goal_description,
          goal.target_date,
        ]
      );
    }

    console.log("Recovery goals inserted successfully.");
  } catch (error) {
    console.error("Error inserting recovery goals:", error);
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
    await insertTrickGoals();
    await insertRecoveryGoals();
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await db.end();
  }
};

seedDatabase();
