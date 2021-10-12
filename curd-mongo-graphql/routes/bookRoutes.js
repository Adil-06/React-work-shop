const router = require('express').Router();
const bookController = require('../controller/bookController');

router.post('/book', bookController.postBook );

module.exports = router