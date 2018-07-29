const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

router.get('', function(req, res){
    Rental.find({}, function(err, foundRentals){
        res.json(foundRentals);
    })
});

router.get('/:id', function(req, res){
    const rentalId = req.params.id;
    
    Rental.findById(id)
});

module.exports = router;