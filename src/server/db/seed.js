const db = require("./client");
const { createUser } = require("./users");
const tricksData = require("./tricksData");

// Sample users
const users = [
  {
    name: "speedD3mon",
    email: "aj@a.com",
    password: "pass",
    first_name: "AJ",
    last_name: "Seadler",
    phone_number: "123-456-7890",
    shipping_address: "123 Elm Street, Springfield",
    description: "Bingo bango bongo OKC skateboarding.",
  },
  {
    name: "tonysoprano",
    email: "tonE@a.com",
    password: "pass",
    first_name: "Tony",
    last_name: "Soprano",
    phone_number: "987-654-3210",
    shipping_address: "456 Oak Avenue, Newark",
    description: "456 Oak Avenue, Newark",
  },
  {
    name: "shredMaster42",
    email: "shredder@x.com",
    password: "pass123",
    first_name: "Jake",
    last_name: "Wheeler",
    phone_number: "555-789-1234",
    shipping_address: "789 Pine Lane, Boulder",
    description: "789 Pine Lane, Boulder",
  },
  {
    name: "flipKing77",
    email: "flipking@b.com",
    password: "pass456",
    first_name: "Ryan",
    last_name: "Carter",
    phone_number: "555-321-9876",
    shipping_address: "321 Maple Road, Portland",
    description: "321 Maple Road, Portland",
  },
  {
    name: "ollieQueen90",
    email: "ollie@c.com",
    password: "pass789",
    first_name: "Sarah",
    last_name: "Hill",
    phone_number: "555-654-4321",
    shipping_address: "654 Cedar Street, Denver",
    description: "654 Cedar Street, Denver",
  },
  {
    name: "grindMachineX",
    email: "grinder@d.com",
    password: "pass101",
    first_name: "Lucas",
    last_name: "Turner",
    phone_number: "555-876-5432",
    shipping_address: "876 Birch Avenue, Austin",
    description: "876 Birch Avenue, Austin",
  },
  {
    name: "sk8rboi23",
    email: "sk8r@e.com",
    password: "pass202",
    first_name: "Emily",
    last_name: "Moore",
    phone_number: "555-432-1987",
    shipping_address: "432 Poplar Drive, Miami",
    description: "432 Poplar Drive, Miami",
  },
  {
    name: "railSlide99",
    email: "rail@f.com",
    password: "pass303",
    first_name: "David",
    last_name: "Johnson",
    phone_number: "555-345-6789",
    shipping_address: "345 Spruce Lane, Seattle",
    description: "345 Spruce Lane, Seattle",
  },
  {
    name: "kickFlipQueen",
    email: "kflip@h.com",
    password: "pass404",
    first_name: "Mia",
    last_name: "Anderson",
    phone_number: "555-987-2345",
    shipping_address: "987 Willow Way, Chicago",
    description: "987 Willow Way, Chicago",
  },
  {
    name: "boardMaster88",
    email: "board@i.com",
    password: "pass505",
    first_name: "Chris",
    last_name: "Davis",
    phone_number: "555-789-0123",
    shipping_address: "789 Ash Street, San Francisco",
    description: "789 Ash Street, San Francisco",
  },
  {
    name: "grindGuru77",
    email: "grindguru@j.com",
    password: "pass606",
    first_name: "Sophia",
    last_name: "Martinez",
    phone_number: "555-123-0987",
    shipping_address: "123 Redwood Lane, Los Angeles",
    description: "123 Redwood Lane, Los Angeles",
  },
  {
    name: "popShuvitPro",
    email: "popshuv@k.com",
    password: "pass707",
    first_name: "Ethan",
    last_name: "Garcia",
    phone_number: "555-234-5678",
    shipping_address: "234 Elm Drive, San Diego",
    description: "234 Elm Drive, San Diego",
  },
];

const dropTables = async () => {
  try {
    await db.query(`
      DROP TABLE IF EXISTS user_tricks, trick_goals, tricks, statuses, users CASCADE;
    `);
    console.log("Tables dropped successfully.");
  } catch (error) {
    console.error("Error dropping tables:", error);
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
        description VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        points INTEGER DEFAULT 0
      );

     CREATE TABLE statuses (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media_url TEXT, -- Optional media (images/videos)
    created_at TIMESTAMPTZ DEFAULT NOW() -- Combined timestamp with timezone
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
        status VARCHAR(50) CHECK (status IN ('learning', 'mastered')) DEFAULT 'learning',
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
        description: user.description,
        points: user.points,
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
    console.log("Initial data inserted successfully.");
  } catch (error) {
    console.error("Error inserting initial data:", error);
  }
};

const insertUserTricks = async () => {
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
      .slice(0, 5); // Select 5 tricks

    // Insert user_tricks with status
    for (const userId of userIds) {
      for (const trickId of selectedTrickIds) {
        await db.query(
          `
          INSERT INTO user_tricks(user_id, trick_id, learned_date, status)
          VALUES($1, $2, NOW(), 'learning')`,
          [userId, trickId]
        );
      }
    }
    console.log("User tricks inserted successfully.");
  } catch (error) {
    console.error("Error inserting user tricks:", error);
  }
};

const insertStatuses = async () => {
  try {
    // Example statuses
    const statuses = [
      {
        user_id: 1,
        content: "Just landed my first kickflip! 🎉",
        media_url:
          "https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM2NDM2NzUxMjE0MDg1/1-kickflip---main-image.jpg",
      },
      {
        user_id: 2,
        content: "Practicing grinds at the local park. 🛹",
      },
      {
        user_id: 3,
        content: "Chillin' with the crew at the skate spot.",
        media_url:
          "https://boardblazers.com/cdn/shop/articles/how_to_kickflip_800x800.jpg?v=1701816573",
      },
    ];

    for (const status of statuses) {
      await db.query(
        `
        INSERT INTO statuses(user_id, content, media_url)
        VALUES($1, $2, $3)`,
        [status.user_id, status.content, status.media_url]
      );
    }

    console.log("Statuses inserted successfully.");
  } catch (error) {
    console.error("Error inserting statuses:", error);
  }
};

const insertTrickGoals = async () => {
  try {
    const { rows: users } = await db.query("SELECT id FROM users");
    const { rows: tricks } = await db.query("SELECT trick_id FROM tricks");

    for (const user of users) {
      const randomTrick = tricks[Math.floor(Math.random() * tricks.length)];
      const targetDate = new Date();
      targetDate.setMonth(targetDate.getMonth() + 1); // Target 1 month from now

      await db.query(
        `
        INSERT INTO trick_goals(user_id, trick_id, goal_description, target_date)
        VALUES($1, $2, $3, $4)`,
        [
          user.id,
          randomTrick.trick_id,
          `Goal to master trick #${
            randomTrick.trick_id
          } by ${targetDate.toLocaleDateString()}`,
          targetDate,
        ]
      );
    }
    console.log("Trick goals inserted successfully.");
  } catch (error) {
    console.error("Error inserting trick goals:", error);
  }
};

const seedDatabase = async () => {
  try {
    await db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertInitialData();
    await insertUserTricks();
    await insertStatuses(); // Insert statuses
    await insertTrickGoals();
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await db.end();
  }
};

seedDatabase();
