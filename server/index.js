const express = require('express');

const app = express();

app.get('/rentals', (req,res) => {
    res.json({sucess:true})
})

const PORT = process.env.PORT || 3001;

app.listen(PORT,() => {
    console.log("server is running");
})