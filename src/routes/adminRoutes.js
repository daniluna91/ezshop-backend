const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');
const productController = require('../controllers/productController');

//router.post se usa para crear un producto y se verifica el token y el rol
router.post('/products', verifyToken, checkRole(['admin']), productController.createProduct);

module.exports = router;
