const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');


mongoose.connect(config.DB_URI, { useNewUrlParser: true })
    .then((sucess) => {
        const fakeDb = new FakeDb();
        fakeDb.seedDb(); 
    });

const app = express();

app.get('/rentals', (req,res) => {
    res.json({sucess:true})
})

const PORT = process.env.PORT || 3001;

app.listen(PORT,() => {
    console.log("server is running");
})