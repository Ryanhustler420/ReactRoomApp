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
    totalPrice:number,
    days:{
        type: number,
        required: true
    },
    guests:number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rental: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Rental'
    }
});

module.exports = mongoose.model('Booking',bookingSchema); 