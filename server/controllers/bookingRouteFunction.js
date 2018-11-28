const { normalizeErrors } = require('../helper/errorParser');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const Rental = require('../models/rental');
const Booking = require('../models/booking');
const User = require('../models/user');

exports.createBooking = function(req, res){

    //here we will get 'user' 'rental' and make 'booking'

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
        .populate('bookings') // populating booking array of rental for further iteration
        .populate('user') // populating user detail who owned this rental for checking if this user is not owner of this rental
        .exec(function(err, foundRental){
            //checking error if we not got any rental with this id
            if(err)
                return res.status(422).send(createErrorObject('something wrong!',err.error));

            // we'll check if this rental owner id equlas with this user who is trying to make booking.
            if(foundRental.user.id === user.id)
                return res.status(422).send(createErrorObject('Invalid User!','Cannot create booking on your Rental!'))
            
            // we'll check if this booking is posible or not by passing the rental bookings array to function for date checking through iteration and with moment librrry
            if(isValidBooking(booking, foundRental)){
                // we'll push user who booked this rental to the booking user field
                booking.user = user;
                // pushing this rental to booking rental field 
                booking.rental = foundRental;
                // we'll save this booking and after successfully save
                booking.save((error) => {
                    // checking error if we got any
                    if(error){
                        return res.status(422).send(createErrorObject('something wrong!',err.error));
                    }
                    // updating user bookings array by pushing
                        User.update({_id: user.id}, {$push: {bookings:booking}},(err,data) => {});
                    // updating this rental's bookings array with given rental id
                        Rental.update({_id:rental._id}, {$push: {bookings:booking}},(err,data) => {})

                    // finally we send this message with start date and end date as an object
                    return res.json({'startAt':booking.startAt, endAt: booking.endAt});
                });

            }else{
                // if the user is same as rental owener than we'll send error message because he/she can't book his/her own rental
                return res.status(422).send(createErrorObject('Invalid Booking','Choosen Date are already taken!'));
            }
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


/**
 * @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
 * 
 *  checking date for booking possibilty
 * 
 * @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
 * 
 */

// checking booking array date and iterate each date and check if its valid or not
function isValidBooking(DemandBookingObject, FoundRentalsBookingList) {
    
    let isValid = true;
    if(FoundRentalsBookingList.bookings && FoundRentalsBookingList.bookings.length > 0){

        isValid = FoundRentalsBookingList.bookings.every((eachBooking) => {
            
            // Example Date: 1 Jan - 15 Jan
            // this start and end date is what user want
            
            const wantStartDate = moment(DemandBookingObject.startAt); // 1 Jan
            const wantEndDate = moment(DemandBookingObject.endAt); // 15 Jan

            // Example Date: 12 Feb - 18 Feb
            // this start and end date is  each booking data's array date

            const DB_DATE_START = moment(eachBooking.startAt); // 12 Feb
            const DB_DATE_END = moment(eachBooking.endAt); // 18 Feb

            // this is the formula for checking date isValid

            // example (12 Feb < 1 Jan && 18 Feb < 15 Jan) || 
                    // ( 15 Jan < 18 Feb && 15 Jan < 12 Feb)

            return ((DB_DATE_START < wantStartDate && DB_DATE_END < wantEndDate) ||
                        (wantEndDate < DB_DATE_END && wantEndDate < DB_DATE_START))
        });
    }
    return isValid;
}

/**
 * @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
 * 
 *  Manage Routes
 * 
 * @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
 * 
 */

exports.getUserBookings = function(req, res){
    const user = res.locals.user;
    
    Booking.where({user})
        .populate('rental')
        .exec(function(error, foundRentals){
            if(error){
                return res.status(422).send(createErrorObject('something wrong!',error.error));
            }
        
            return res.json(foundRentals);
        });
}