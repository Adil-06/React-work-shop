const router = require('express').Router();
const orderController = require('../controller/orderController');

router.get('/order', orderController.getAllOrders);
router.post('/order', orderController.postNewOrder);
router.get('/order/customer', orderController.getFilterCustomer);

module.exports  = router;