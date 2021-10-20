const router = require('express').Router();
const customerController = require('../controller/customerController');

router.get('/customer', customerController.getAllCustomer);
router.post ('/customer', customerController.postNewCustomer);

module.exports = router;