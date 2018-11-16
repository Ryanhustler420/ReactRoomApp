const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    endAt:{
        type: Date,
        required: 'Ending Date is Required'
    },
    startAt:{
        type: Date,
        required: 'Starting Date is Required'
    },
    totalPrice:Number,
    days:{
        type: Number,
        required: true
    },
    guests:Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rental: {
        type: Schema.Types.ObjectId,
        ref: 'Rental'
    }
});

module.exports = mongoose.model('Booking',bookingSchema); 