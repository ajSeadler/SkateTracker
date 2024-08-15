const db = require('./client');
const { createUser } = require("./users");
const initialData = require("./seedData");

const users = [
  {
    name: 'ajseadler',
    email: 'aj@a.com',
    password: 'pass',
    first_name:'AJ',
    last_name: 'Seadler',
    phone_number: '5021234432',
    shipping_address: '123 main st',
    billing_address: '123 main st',
  },
  {
    name: 'tonysoprano',
    email: 'tonE@a.com',
    password: 'pass',
    first_name:'Tony',
    last_name: 'Soprano',
    phone_number: '5021234432',
    shipping_address: '123 main st',
    billing_address: '123 main st',
  }
];

const dropTables = async () => {
  try {
    // Drop tables with CASCADE option to drop dependent objects
    await db.query('DROP TABLE IF EXISTS order_items, orders, reviews, wishlist_items, wishlists, users, products, categories, product_categories CASCADE;');
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
        phone_number VARCHAR(20),
        shipping_address TEXT,
        billing_address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE products (
        product_id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        brand VARCHAR(255),
        description TEXT,
        price DECIMAL,
        stock_quantity INTEGER,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE categories (
        category_id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE orders (
        order_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        total_price DECIMAL,
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE order_items (
        order_item_id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(order_id),
        product_id INTEGER REFERENCES products(product_id),
        quantity INTEGER,
        item_price DECIMAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(product_id),
        user_id INTEGER REFERENCES users(id),
        rating INTEGER,
        comment TEXT,
        review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE wishlists (
        wishlist_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE wishlist_items (
        wishlist_item_id SERIAL PRIMARY KEY,
        wishlist_id INTEGER REFERENCES wishlists(wishlist_id),
        product_id INTEGER REFERENCES products(product_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE product_categories (
        product_id INTEGER REFERENCES products(product_id),
        category_id INTEGER REFERENCES categories(category_id),
        PRIMARY KEY (product_id, category_id)
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
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed data:", error);
  }
};

const insertInitialData = async () => {
  try {
    const {
      products,
      categories,
      orders,
      order_items,
      reviews
    } = initialData;

    // Insert categories
    for (const category of categories) {
      await db.query(`
        INSERT INTO categories(name)
        VALUES($1)
        ON CONFLICT (name) DO NOTHING`,
        [category.name]
      );
    }

    // Insert products
    for (const product of products) {
      const result = await db.query(`
        INSERT INTO products(name, brand, description, price, stock_quantity, image_url)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING product_id`,
        [product.name, product.brand, product.description, product.price, product.stock_quantity, product.image_url]
      );
      const productId = result.rows[0].product_id;

      // Associate products with categories
      for (const categoryName of product.categories) {
        const category = await db.query(`
          SELECT * FROM categories WHERE name = $1`,
          [categoryName]
        );
        if (category.rows.length > 0) {
          await db.query(`
            INSERT INTO product_categories(product_id, category_id)
            VALUES($1, $2)`,
            [productId, category.rows[0].category_id]
          );
        }
      }
    }

    // Insert orders
    for (const order of orders) {
      await db.query(`
        INSERT INTO orders(user_id, total_price, status)
        VALUES($1, $2, $3)`,
        [order.user_id, order.total_price, order.status]
      );
    }

    // Insert order items
    for (const item of order_items) {
      await db.query(`
        INSERT INTO order_items(order_id, product_id, quantity, item_price)
        VALUES($1, $2, $3, $4)`,
        [item.order_id, item.product_id, item.quantity, item.item_price]
      );
    }

    // Insert reviews
    for (const review of reviews) {
      await db.query(`
        INSERT INTO reviews(product_id, user_id, rating, comment)
        VALUES($1, $2, $3, $4)`,
        [review.product_id, review.user_id, review.rating, review.comment]
      );
    }

    console.log("Initial data inserted successfully.");
  } catch (error) {
    console.error("Error inserting initial data:", error);
  }
};


const seedDatabase = async () => {
  try {
    await db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertInitialData();
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await db.end();
  }
};

seedDatabase();
