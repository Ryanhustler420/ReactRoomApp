const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        min: [4,'Too Short, min is 4 characters'],
        max: [32,'Too long, max is 32 characters']
    },
    email:{
        type: String,
        min: [4,'Too Short, min is 4 characters'],
        max: [32,'Too long, max is 32 characters'],
        required: 'Email is required',
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password:{
        type: String,
        required: 'Password is required',
        min: [4,'Too Short, min is 4 characters'],
        max: [32,'Too long, max is 32 characters']
    },
    rentals:[{type: Schema.Types.ObjectId, ref: 'Rental'}]
});

// this function run before save operation.
// make sure you dont use arrow function because if you do than
// you won't be able to use 'this'
userSchema.pre('save', function(next){
    const user = this;
    
    // we get the un-hashed password and conver that into hash format before saving to the
    // database

    const saltRound = 10;
    bcrypt.genSalt(saltRound, function(error, salt) {
        bcrypt.hash(user.password, salt, function(error, hash){
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User',userSchema); 