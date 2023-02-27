const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app =  express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

dotenv.config({path:'./.env'});

require('./db/conn');
const User = require('./model/userSchema');

app.use(express.json());
app.use(cookieParser());


app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
  }));
 
  

// we link the router files to make our route easy
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./router/auth'));

const PORT = process.env.PORT




app.get('/contact',  (req, res) =>{
   
    res.send(`Hello Contact world from the server `);
});

app.get('/signin', (req, res) =>{
    res.send(`Hello Login world from the server `);
});

app.get('/signup', (req, res) =>{
    res.send(`Hello Registration world from the server `);
});

app.listen(PORT, ()=>{
    console.log(`server is running at port no ${PORT}`)
})