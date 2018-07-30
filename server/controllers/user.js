const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth = function(req, res){
    const {email, password} = req.body;

    if(!password || !email) {
        return res.status(422).send({
            errors: [{
                title: 'Data missing!',
                detail: 'Please give email and password'
            }]
        });
    }

    User.findOne({email}, function(err, user){
        if(err){
            return res.status(422).send({
                errors: normalizeErrors(err.errors)
            });
        }
        if(!user){
            return res.status(422).send({
                errors: [{
                    title: 'Invalid user!',
                    detail: 'User does not exist'
                }]
            });
        }
        if(user.hasSamePassword(password)){
            const token = jwt.sign({
                userId: user.id,
                username: user.username
              }, config.SECRET, { expiresIn: '1h' });
            
              return res.json(token);
        }else{
            return res.status(422).send({
                errors: [{
                    title: 'Wrong Data!',
                    detail: 'Wrong email or password'
                }]
            });
        }
    });
}

exports.register = function(req, res){

    // We can write like that it equals to const username = req.body.username
    const {username, email, password, passwordConfirmation} = req.body;

    if(!password || !email) {
        return res.status(422).send({
            errors: [{
                title: 'Data missing!',
                detail: 'Please give email and password'
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
                errors: normalizeErrors(err.errors)
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
                    errors: normalizeErrors(err.errors)
                });
            }

            return res.json({
                'registered' :true
            })
        });
    })
}

exports.authMiddleware = function(req, res, next){
    const token = req.headers.authorization;

    if(token){
        const user = parseToken(token);

        User.findById(user.userId, function(err, user) {
            if(err){
                return res.status(422).send({
                    errors: normalizeErrors(err.errors)
                });
            }
            if(user){
                res.locals.user = user;
                next();
            }else{
                return res.status(422).send({
                    'Not authorized' : 'You need to login!'
                });
            }
        });
    }
    else{
        return res.status(422).send({
            'Not authorized' : 'You need to login!'
        });
    }
}

function parseToken(token){
    return jwt.verify(token.split(' ')[1], config.SECRET);
}