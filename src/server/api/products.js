const express = require('express');
const productsRouter = express.Router();
const { getAllProducts, getProductById, getAllElectricGuitars, getAllAcousticGuitars, getAllAmplifiers } = require('../db/products');

// Route to get all electric guitars
productsRouter.get('/electric', async (req, res) => {
  try {
    const electricGuitars = await getAllElectricGuitars();
    res.json(electricGuitars);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

productsRouter.get('/acoustic', async (req, res) => {
  try {
    const acousticGuitars = await getAllAcousticGuitars();
    res.json(acousticGuitars);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

productsRouter.get('/amplifiers', async (req, res) => {
  try {
    const electricGuitars = await getAllAmplifiers();
    res.json(electricGuitars);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a product by ID
productsRouter.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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
