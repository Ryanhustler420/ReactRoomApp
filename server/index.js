const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');

mongoose.connect(config.DB_URI, { useNewUrlParser: true });

const app = express();

app.get('/rentals', (req,res) => {
    res.json({sucess:true})
})

const PORT = process.env.PORT || 3001;

app.listen(PORT,() => {
    console.log("server is running");
})