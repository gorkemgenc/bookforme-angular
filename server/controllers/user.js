exports.auth = function(req, res){

}

exports.register = function(req, res){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;

    res.json({username, email});
}