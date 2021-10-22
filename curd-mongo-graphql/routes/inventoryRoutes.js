const router = require('express').Router();
const inventoryController =  require('../controller/inventoryController');

router.post('/inventory', inventoryController.postNewInventory);
router.get('/inventory', inventoryController.getAllInventory);


module.exports  = router;
