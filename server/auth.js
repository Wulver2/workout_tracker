require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require("./db");


// create account
app.post('/register', (req, res) => {
    const {first_name, last_name, email, password} = req.body;

    // check that all fields are defined
    // check if user exists 
    // hash password before storing

    // generate token
    const accessToken = jwt.sign(
        user, 
        process.env.ACCESS_JWT_SECRET, 
        {expiresIn: "30d"});

    res.json({accessToken : accessToken})

})

app.listen(8080)