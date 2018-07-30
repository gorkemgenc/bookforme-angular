const User = require('../models/user');

exports.auth = function(req, res){

}

exports.register = function(req, res){

    // We can write like that it equals to const username = req.body.username
    const {username, email, password, passwordConfirmation} = req.body;

    if(!username || !email) {
        return res.status(422).send({
            errors: [{
                title: 'Data missing!',
                detail: 'please give email and password'
            }]
        });
    }

    if(password !== passwordConfirmation){
        return res.status(422).send({
            errors: [{
                title: 'Invalid password!',
                detail: 'Password and confirmartion should be same!'
            }]
        });
    }

    User.findOne({email: email}, function(err, existingUser){
        if(err){
            return res.status(422).send({
                'mongoose' : 'Handle mongoose errors later'
            });
        }
        if(existingUser){
            return res.status(422).send({
                'Invalid email!' : 'Email is already registered!'
            });
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save(function(err){
            if(err){
                return res.status(422).send({
                    'Error!' : err
                });
            }

            return res.json({
                'registered' :true
            })
        });
    })
}