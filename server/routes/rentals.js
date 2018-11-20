const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const UserCtrl = require('../controllers/userRouteFunction');
const { normalizeErrors } = require('../helper/errorParser');
const User = require('../models/user');

router.get('',(req,res) => {
    const city = req.query.city;
    const query = city ? { city: city.toLowerCase() } : {}

    Rental.find(query)
        .select('-bookings') // this means we dont want bookings array here
        .exec(function(error, filterRentals){
            if(error)
                return res.status(422).send({errors:normalizeErrors(error.errors)});

            // if lenght of foundRental is 0 thats means we dont got any rental by search query
            if(filterRentals.length == 0)
                return res.status(422).send(createErrorObject('No Rental Found!',`There are no rentals for city ${city}`));

            // if we got this line that means we found that renatal and we we'll send that response
            return res.json(filterRentals);
        })
});

router.get('/:id', (req,res) => {
    const rentalId = req.params.id;

    Rental.findById( rentalId )
        .populate('user', 'username -_id')
        .populate('bookings', 'startAt endAt -_id')
            .exec(function(err,foundRental){
                if(err){
                    return res.status(422).send({errors:[{title:'Rental Error!', detail: 'Could not find Rental!'}]});
                }
        return res.json(foundRental);
    });
});

router.post('', UserCtrl.authMiddleware, (req, res) => {
    const { title, street, city, category, image, bedrooms, shared, description, dailyRate } = req.body;
    const newRental = new Rental({ title, street, city, category, image, bedrooms, shared, description, dailyRate });
    const user = res.locals.user;
    Rental.create(newRental, (error, rental) => {
        if(error)
            return res.status(422).send({errors: normalizeErrors(error.errors)});

        User.updateOne({_id: user.id},{$push: {rentals: rental}},(error, data) => {});
        return res.json(rental);
    })
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