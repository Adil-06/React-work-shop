const router = require('express').Router();
const userController = require('../controller/userController');
const verifyToken = require('../middleware/verifyToken')

router.post('/register', userController.create_User );
router.get('/register', userController.get_Users);

router.post('/login', userController.userLogin);

router.get('/welcome', verifyToken , (req, res) => {
    res.status(200).send("welcome user")
})


module.exports = router;