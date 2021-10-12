const router = require('express').Router();
const publishController = require('../controller/publishController');

router.post('/publish',publishController.publishPost);
router.get('/publish', publishController.get_Publisher)
router.get('/publish/:year', publishController.getPublisherbyYear)
router.get('/publish/:name/:location', publishController.update_Publisher)

module.exports = router