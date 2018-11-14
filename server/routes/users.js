const express = require('express');
const router = express.Router();

const UserRouteFunc = require('../controllers/userRouteFunction');

router.post('/auth', UserRouteFunc.auth);

router.post('/register', UserRouteFunc.register);

module.exports = router;
