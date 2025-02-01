const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth');
const multer = require('../utils/multer');

router.post('/register', multer.single('avatar'),  AuthController.register,);
router.post('/login', AuthController.login);

module.exports = router;