const router = require('express').Router();
const productController = require('../controller/productController');

router.post('/product', productController.postProduct);
router.get('/product', productController.getAllProducts);

module.exports  = router;