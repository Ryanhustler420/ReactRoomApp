const User = require('../models/user');

exports.auth = function(req, res) {
    res.json({'auth':'route working'});
}

exports.register = function(req, res) {
    const {username, email, password, passwordConfirm} = req.body;

    // if email or password is empty than throw this error
    if(!password || !email){
        return res.status(422).send(createErrorObject('Data Missing','Provide email and password!'));
    }

    // if both password not match than throw this error 
    if(password !== passwordConfirm){
        return res.status(422).send(createErrorObject('Invalid password','Password is not as same as confirmation!'));
    }

    // searching into the database with givin email id
    User.findOne({email}, (error, user) => {

        // if something went wrong with database while searching user than we'll throw this error
        if(error)
            return res.status(422).send(createErrorObject('Invalid password','Password is not as same as confirmation!'));

        // if user already exists in the data base
        if(user)
            return res.status(422).send(createErrorObject('Invalid Email',`User with this email ${email} already exist!`));

        //creating new user after checking into database if user not exist with the given email id
        const newUser = new User({ username, email, password });

        // saving to the database async
        // await newUser.save();
        newUser.save((error) => {
            if(error) {
                return res.status(422).send(createErrorObject('Database','Error occure while registering user')); 
            }
            // sending response back if registration successfull
            return res.json({'status':true});
        });
    });
}

const createErrorObject = (title,detail) => {
    return {
        errors: [
            {
                title,detail
            }
        ]
    }
}