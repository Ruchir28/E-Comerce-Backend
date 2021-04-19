require('dotenv').config();

const express = require("express");

const app = express();


const port = process.env.port ||  8000;

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log(`DB CONNECTED at ${process.env.DATABASE}`);
}).catch((err)=>{
    console.log("DB Failed to connect");
});

app.listen(port,()=>{
    console.log(`app is up and running at ${port}`);
})
