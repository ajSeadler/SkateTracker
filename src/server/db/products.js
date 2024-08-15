const db = require('./client');

const getAllProducts = async () => {
  try {
    const query = `
      SELECT 
        p.*,
        AVG(r.rating) AS rating
      FROM 
        products p
      LEFT JOIN 
        reviews r ON p.product_id = r.product_id
      GROUP BY 
        p.product_id;
    `;
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (productId) => {
  try {
    const query = `
      SELECT 
        p.*,
        AVG(r.rating) AS rating
      FROM 
        products p
      LEFT JOIN 
        reviews r ON p.product_id = r.product_id
      WHERE 
        p.product_id = $1
      GROUP BY 
        p.product_id;
    `;
    const { rows } = await db.query(query, [productId]);
    return rows[0]; 
  } catch (error) {
    throw error;
  }
};

const getAllElectricGuitars = async () => {
  try {
    const query = `
      SELECT 
        p.*,
        AVG(r.rating) AS rating
      FROM 
        products p
      LEFT JOIN 
        reviews r ON p.product_id = r.product_id
      WHERE 
        p.product_id IN (
          SELECT product_id FROM product_categories 
          WHERE category_id = (
            SELECT category_id FROM categories 
            WHERE name = 'Electric Guitars'
          )
        )
      GROUP BY 
        p.product_id;
    `;
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getAllAcousticGuitars = async () => {
  try {
    const query = `
      SELECT 
        p.*,
        AVG(r.rating) AS rating
      FROM 
        products p
      LEFT JOIN 
        reviews r ON p.product_id = r.product_id
      WHERE 
        p.product_id IN (
          SELECT product_id FROM product_categories 
          WHERE category_id = (
            SELECT category_id FROM categories 
            WHERE name = 'Acoustic Guitars'
          )
        )
      GROUP BY 
        p.product_id;
    `;
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getAllAmplifiers = async () => {
  try {
    const query = `
      SELECT 
        p.*,
        AVG(r.rating) AS rating
      FROM 
        products p
      LEFT JOIN 
        reviews r ON p.product_id = r.product_id
      WHERE 
        p.product_id IN (
          SELECT product_id FROM product_categories 
          WHERE category_id = (
            SELECT category_id FROM categories 
            WHERE name = 'Amplifiers'
          )
        )
      GROUP BY 
        p.product_id;
    `;
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getAllElectricGuitars,
  getAllAcousticGuitars,
  getAllAmplifiers,
};
