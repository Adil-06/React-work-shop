const router = require('express').Router();
const customerController = require('../controller/customerController');

router.get('/customer', customerController.getAllCustomer);
router.post ('/customer', customerController.postNewCustomer);
router.get('/api/customer', customerController.getCustomerProduct);
router.get('/api/custbyname', customerController.getCustomerByName);

module.exports = router;