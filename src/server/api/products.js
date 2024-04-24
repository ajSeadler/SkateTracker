const express = require('express');
const productsRouter = express.Router();
const getAllProducts = require('../db/products');

// Route to get all products
productsRouter.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = productsRouter;
