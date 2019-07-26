const express = require('express')
const router = express.Router()

const authController = require('../controllers/authControllers');

router.get('/login', authController.loginPage);
router.post('/register', authController.submitNewAccountInfo);
router.post('/login', authController.submitLoginInfo);
router.get('/new', authController.newRegistrationPage);



module.exports = router;