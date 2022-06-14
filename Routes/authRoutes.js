const express = require('express');
const auth = require('../Controllers/auth');
const api = require("../Controllers/apiController");
const router = express.Router();
router.post('/register',auth.register);
router.post('/login',auth.login);
router.get('/getUserFromToken',auth.getUserFromToken);
router.get('/verifyEmail/:verificationToken',auth.verifyEmail);
module.exports=router;
