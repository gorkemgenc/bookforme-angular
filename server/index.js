const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const app = express();
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals');

// Notice that connect is already promise so use then catch function
mongoose.connect(config.DB_URI, {useNewUrlParser: true}).then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
});


// This is middleware
app.use('/api/v1/rentals', rentalRoutes);

// check if there is PORT or not for environment file
const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('I am running');
});