const { normalizeErrors } = require('../helper/errorParser');
const jwt = require('jsonwebtoken');

const Rental = require('../models/rental');
const Booking = require('../models/booking');

exports.createBooking = function(req, res){
    // getting these data from api request and access this in body
    const { startAt, endAt, totalPrice, guests, days, rental } = req.body;

    // fetching the current user who trigger this api endpoint so this user can 
    // be access through token decoding
    const user = res.locals.user;

    // creating new Booking
    const booking = new Booking({
        startAt,
        endAt,
        totalPrice,
        guests,
        days
    });
    
    // finding rental with given _id form request make sure you have refreshed new rental id else it will throw error
    Rental.findById(rental._id)
        .populate('bookings')
        .populate('user')
        .exec(function(err, foundRental){
            if(err)
                return res.status(422).send({errors: normalizeErrors(err.errors)});

            console.log(foundRental);
            if(foundRental.user.id === user._id)
                return res.status(422).send(createErrorObject('Invalid User!','Cannot create booking on your Rental!'))
            
            return res.json({
                booking,
                foundRental
            })
        });

}

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