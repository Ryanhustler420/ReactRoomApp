const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const UserCtrl = require('../controllers/userRouteFunction');
const { normalizeErrors } = require('../helper/errorParser');

router.get('',(req,res) => {
    const city = req.query.city;

    if(city){
        Rental.find({city: city.toLowerCase()})
            .select('-bookings') // this means we dont want bookings array here
            .exec(function(error, filterRentals){
                if(error)
                    return res.status(422).send({error:normalizeErrors(error.errors)});

                // if lenght of foundRental is 0 thats means we dont got any rental by search query
                if(filterRentals.length == 0)
                    return res.status(422).send({error:createErrorObject('No Rental Found!',`There are no rentals for city ${city}`)});

                // if we got this line that means we found that renatal and we we'll send that response
                return res.json(filterRentals);
            })
    }else{
        Rental.find({})
        .select('-bookings')
        .exec(function(err,foundRental){
            res.json(foundRental);
        });
    }
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

// create error message object as a helper method
const createErrorObject = (title,detail) => {
    return {
        errors: [
            {
                title,detail
            }
        ]
    }
}

module.exports = router; 