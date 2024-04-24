const express = require('express');
const productsRouter = express.Router();
const getAllProducts = require('../db/products');
const getProductsByBrand = require('../db/products');

// Route to get all products
productsRouter.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

productsRouter.get('/brand/:brand', async (req, res) => {
  const { brand } = req.params;
  try {
    const products = await getProductsByBrand(brand); // Modify this function to fetch products by brand
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = productsRouter;
