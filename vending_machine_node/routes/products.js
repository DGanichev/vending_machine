const express = require('express');
const router = express.Router();
const products = require('../constants/products');

router.get('/', (req, res) => {
  res.send(products);
});

module.exports = router;
