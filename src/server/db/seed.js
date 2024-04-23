const db = require('./client');

const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
  // Add more user objects as needed
];  



const dropTables = async () => {
  try {
    await db.query('DROP TABLE IF EXISTS users, sales;');
  } catch (error) {
    throw error;
  }
};

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) DEFAULT 'name',
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

  } catch (error) {
    throw error;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await db.query(`
        INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
      `, [user.name, user.email, user.password]);
    }
    console.log('User data inserted successfully.');
  } catch (error) {
    console.error('Error inserting user data:', error);
  }
};

const seedDatabase = async () => {
  try {
    await db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await db.end();
  }
};

seedDatabase();
