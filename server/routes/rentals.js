const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

router.get('',(req,res) => {
    Rental.find({}, (err,rentals) => {
        res.json(rentals);
    });
});

router.get('/:id', (req,res) => {
    const rentalId = req.params.id;

    Rental.findById(rentalId, (err, foundRental) => {
        if(err){
            return res.status(422).send({error:[{title:'Rental Error!', detail: 'Could not find Rental!'}]});
        }
        return res.json(foundRental);
    });
});

module.exports = router; 