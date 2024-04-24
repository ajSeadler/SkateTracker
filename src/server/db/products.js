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


module.exports = getAllProducts;
