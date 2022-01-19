const express = require('express');
const auth = require('../Controllers/auth');
const router = express.Router();
router.post('/register',auth.register);
router.post('/login',auth.login);
router.get('/getUserFromToken',auth.getUserFromToken);
module.exports=router;