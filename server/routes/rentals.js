const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const UserCtrl = require('../controllers/userRouteFunction');

router.get('',(req,res) => {
    Rental.find({})
    .select('-bookings')
    .exec(function(err,foundRental){
        res.json(foundRental);
    });
});

router.get('/:id', (req,res) => {
    const rentalId = req.params.id;

    Rental.findById( rentalId )
        .populate('user', 'username -_id')
        .populate('bookings', 'startAt endAt -_id')
            .exec(function(err,foundRental){
                if(err){
                    return res.status(422).send({error:[{title:'Rental Error!', detail: 'Could not find Rental!'}]});
                }
        return res.json(foundRental);
    });
});

module.exports = router; 