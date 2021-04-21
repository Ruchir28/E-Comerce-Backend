require('dotenv').config();

const express = require("express");
const bodyparser_middleware  = require('body-parser');
const cookie_parser = require('cookie-parser');
const cors = require('cors');

const app = express();


const port = process.env.port ||  8000;

const mongoose = require('mongoose');
//DB-CONNECTION
mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log(`DB CONNECTED at ${process.env.DATABASE}`);
}).catch((err)=>{
    console.log("DB Failed to connect");
});

app.listen(port,()=>{
    console.log(`app is up and running at ${port}`);
})

//MIDDLEWARES

//as data comes in chunks of streams 
//bodyparser just collects the data 
//and put it in the req.body

app.use(bodyparser_middleware.json());
app.use(cookie_parser());
app.use(cors());
//A DEMO OF WHAT BODYPARSER DOES->
// app.use(function( req, res, next ) {
//     var data = '';
//     req.on('data', function( chunk ) {
//       data += chunk;
//     });
//     req.on('end', function() {
//       req.rawBody = data;
//       console.log( 'on end: ', data )
//       if (data && data.indexOf('{') > -1 ) {
//         req.body = JSON.parse(data);
//       }
//       next();
//     });
//   });


//ROUTES
app.use('/api',require("./routes/auth"));

app.use('/api',require('./routes/user'));
