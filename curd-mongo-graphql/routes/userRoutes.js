const express = require('express');
const signupController = require('../Controller/signupController')
const router = express.Router();

router.post('/' , signupController.signupPost );
router.get('/', signupController.getSignedUpUSer);
router.delete('/:id', signupController.deleteUser);
router.put('/:id', signupController.updateUser); 
//router.get('/users', signupController.getPaginatedUser);  
router.get('/api', signupController.userRecord) 
router.get('/users', signupController.filterUsers);
router.delete('/', signupController.deleteManay);
 

module.exports  = router;