const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MIN_VALUE = 4;
const MAX_VALUE = 128

const rentalSchema = new Schema({
    title: {
        type: String, 
        required: true, 
        max: [MAX_VALUE, maxValueError('Title', MAX_VALUE)]
    },
    city: {
        type: String, 
        required: true, 
        lowercase: true, 
        min: [MIN_VALUE, minValueError('City', MIN_VALUE)], 
        max: [MAX_VALUE, maxValueError('City', MAX_VALUE)]
    },
    street: {
        type: String, 
        required:true, 
        min: [MIN_VALUE, minValueError('Street', MIN_VALUE)],  
        max: [MAX_VALUE, maxValueError('Street', MAX_VALUE)]
    },
    category: {
        type: String, 
        required: true, 
        lowercase: true,
        min: [MIN_VALUE, minValueError('Category', MIN_VALUE)],  
        max: [MAX_VALUE, maxValueError('Category', MAX_VALUE)]
    },
    image: {
        type: String, 
        required: true
    },
    bedrooms: Number,
    shared: Boolean,
    description:{
        type: String,
        required: true
    },
    dailyRate: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

function minValueError(val, number){
    return val + 'should be greater than ' + number + ' characters!';
}

function maxValueError(val, number){
    return val + 'should be less than ' + number + ' characters!';
}

module.exports = mongoose.model('Rental', rentalSchema);
