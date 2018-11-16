const { normalizeErrors } = require('../helper/errorParser');
const jwt = require('jsonwebtoken');

exports.createBooking = function(req, res){
    res.json({
        createBooking:'OK'
    })
}