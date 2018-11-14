const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('User',userSchema); 