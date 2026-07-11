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
    const exist = await pool.query(`SELECT * FROM users WHERE email = $1`, [
        email
    ])
    if (exist.rows.length > 0) {
        return res.status(400);
    }
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
    const refreshToken = jwt.sign(
        user, 
        process.env.REFRESH_JWT_TOKEN, 
        {expiresIn: "30d"});

})

app.post('/login', async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400)
    }
    // have to compare password, hashed in database, but not when user enters it
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
        email
    ])
})
app.listen(8080)