const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {verifyToken, isAdmin} = require('../middleware/auth');

router.get('/', verifyToken, userController.getAllUsers);
router.put('/:id/role', verifyToken,isAdmin,  userController.updateUserRole);

module.exports = router;
