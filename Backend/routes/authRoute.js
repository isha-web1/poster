const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();


router.post('/register', registerUser)
router.post('/login',authMiddleware ,loginUser)


module.exports = router;