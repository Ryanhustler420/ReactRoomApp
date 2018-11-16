const express = require('express');
const router = express.Router();

// this import with give access to authentication 'Api'
const UserRouteFunc = require('../controllers/userRouteFunction');
const BookingCtrl = require('../controllers/bookingRouteFunction');


router.post('', BookingCtrl.createBooking);

module.exports = router;
