const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const app = express();
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');

// Notice that connect is already promise so use then catch function
mongoose.connect(config.DB_URI, {useNewUrlParser: true}).then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
});

app.get('/rentals', function(req, res){
    res.json({
        'success' : true
    });
});

// check if there is PORT or not for environment file
const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('I am running');
});