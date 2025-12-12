const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const productController = require('../controllers/productController');

router.post('/products', verifyToken, checkRole(['admin']), productController.createProduct);

module.exports = router;
