const express = require('express');

const app = express();

const PORT = process.env || 3001;

app.listen(PORT,() => {
    console.log("server is running");
})