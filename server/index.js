const express = require('express');
const app = express();

// check if there is PORT or not for environment file
const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('I am running');
});