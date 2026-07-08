require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require("./db");


// create account
app.post('/register', async(req, res) => {
    const {first_name, last_name, email, password} = req.body;

    // check that all fields are defined
    if (!first_name || !last_name || !email|| !password) {
        return res.status(400)
    }
    // check if user exists 
    // hash password before storing
    const hashedPw = await bcrypt.hash(password, 10);

    const registerUser = await pool.query(`
        INSERT INTO users (first_name, last_name, email , password)
        VALUES ($1, $2, $3, $4)`, [
            first_name,
            last_name,
            email,
            hashedPw
        ]);
    // generate token
    const accessToken = jwt.sign(
        user, 
        process.env.ACCESS_JWT_SECRET, 
        {expiresIn: "30d"});

})

app.listen(8080)