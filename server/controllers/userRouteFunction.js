const User = require('../models/user');
const { normalizeErrors } = require('../helper/errorParser');
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.auth = function(req, res) {
    // we are expecting email and password from user
    const { email, password } = req.body;

    // if user or password is empty than , we'll throw error
    if(!password || !email)
        return res.status(422).send(createErrorObject('Data Missing','Provide email and password!'));
    
    // Searching in the database with the givin email id
    User.findOne({email}, function(error, user){

        if(error)
            return res.status(422).send({errors: normalizeErrors(error.errors)});

        // if user not exist than simply throw this message to the client
        if(!user)
            return res.status(422).send(createErrorObject('Invalid user','User does not exist'));

        // we wiil generate token and send to the client as a header which contain user payload
        if(user.isSamePassword(password)){
            // generate token

            const token = jwt.sign({
                userId: user.id,
                username: user.username
            },
                config.SECRET,
                { expiresIn: '1h' }
            );
            
            //sending token with user payload
            return res.json(token);

        }else{
            return res.status(422).send(createErrorObject('Wrong Detail','Wrong user or password'));
        }
    });


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
                return res.status(422).send({errors: normalizeErrors(error.errors)}); 
            }
            // sending response back if registration successfull
            return res.json({'status':true});
        });
    });
}

/////// MIDDLEWARE FOR AUTHENTICATION
//////////// this is auth middleware which help us to check user via token dcryption
exports.authMiddleware = function(req, res, next){
    const token = req.headers.authorization;

    if(token){
        // if token avialable than we dcrypt token and fetch userId
        const user = parseToken(token);

        //searching user with id
        User.findById(user.userId, function(error, user){
            if(error)
                return res.status(422).send({errors: normalizeErrors(error.errors)});

            // if user exist into the database than we pass the value to down middle using 
            // res.locals.user
            if(user){
                res.locals.user = user;
                next();
            } else {
                return notAuthorizeObject(res);
            }

        })

    }else{
        // if user dont pass token than we'll send them this message
        return notAuthorizeObject(res);
    }


}
// create error message object as a helper method
const createErrorObject = (title,detail) => {
    return {
        errors: [
            {
                title,detail
            }
        ]
    }
}

// this function help us to dcrypt token and fetch 'userId' and 'username'
// Example "Bearer jldlewriuja;wfkl;jdsfuowajrokmdfs/ajwehf1"

function parseToken(token) {
    // split 'Bearer' for token and than dcrypt token
    return jwt.verify(token.split(' ')[1], config.SECRET);
}

// helper method for sending message
function notAuthorizeObject(res){
    return res.status(422).send({errors: createErrorObject('Not Authorized','You need to login to get access!')});
}