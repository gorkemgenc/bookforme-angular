const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const app = express();
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals'),
      userRoutes = require('./routes/users');

// Notice that connect is already promise so use then catch function
mongoose.connect(config.DB_URI, {useNewUrlParser: true}).then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
});

// This are middleware
app.use(bodyParser.json());
app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);

// check if there is PORT or not for environment file
const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('App is running');
});