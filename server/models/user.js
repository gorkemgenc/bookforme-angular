const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MIN_VALUE = 4;
const MAX_VALUE = 32

const userSchema = new Schema({
    username: {
        type:String,
        min: [MIN_VALUE, minValueError],
        max: [MAX_VALUE, maxValueError],
        required: 'Username is required'
    },
    email: {
        type: String,
        min: [MIN_VALUE, minValueError],
        max: [MAX_VALUE, maxValueError],
        unique: true,
        lowercase: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type:String,
        min: [MIN_VALUE, minValueError],
        max: [MAX_VALUE, maxValueError],
        required: 'Password is required'
    },
    rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}]
});

function minValueError(val, number){
    return val + 'should be greater than ' + number + ' characters!';
}

function maxValueError(val, number){
    return val + 'should be less than ' + number + ' characters!';
}

userSchema.methods.hasSamePassword = function(requestedPassword){
    return bcrypt.compareSync(requestedPassword, this.password);
}

userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);
