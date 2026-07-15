require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require("../db");
const cookieParser = require('cookie-parser');
const router = express.Router('express');
 
router.use(cookieParser());

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(400);
    }

    jwt.verify(token, process.env.ACCESS_JWT_TOKEN, (err, decoded) => {
        if (err) {
            res.status(400).message("failed authentication")
        }
        else {
            req.user_id = decoded.id;
            next();
        }
    })
}

// create account
router.post('/register', async (req, res) => {

    try {
        const { first_name, last_name, email, password } = req.body;
        // check that all fields are defined
        if (!first_name || !last_name || !email || !password) {
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
        //store in http-only cookie
        const refreshToken = jwt.sign(
            registerUser.rows[0].id,
            process.env.REFRESH_JWT_TOKEN,
            { expiresIn: "30d" });

        const accessToken = jwt.sign(
            registerUser.rows[0].id,
            process.env.ACCESS_JWT_TOKEN,
            { expiresIn: "15m" });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })
        // respond with access token to be stored in state
        res.json({
            accessToken,
            user: {
                id: registerUser.rows[0].id,
                first_name: registerUser.rows[0].first_name,
                last_name: registerUser.rows[0].last_name,
                email: registerUser.rows[0].email
            }
        })
    } catch (err) {
        console.error(err.message);
    }

})

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400);
        }
        // have to compare password, hashed in database, but not when user enters it
        const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
            email
        ]);

        const isMatch = await bcrypt.compare(password, user.rows[0].password);

        if (!isMatch) {
            return res.status(400);
        }

        const user_id = user.rows[0].id

        const refreshToken = jwt.sign(
            user_id,
            process.env.REFRESH_JWT_TOKEN,
            { expiresIn: "30d" });

        const accessToken = jwt.sign(
            user_id,
            process.env.ACCESS_JWT_TOKEN,
            { expiresIn: "15m" });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
        })

        res.json({
            accessToken,
            user: {
                id: user_id,
                first_name: user.rows[0].first_name,
                last_name: user.rows[0].last_name,
                email: user.rows[0].email
            }
        })
    } catch (err) {
        console.error(err.message);
    }

})


router.get('/isAuth', verifyToken, (req, res) => {
    console.log("User is authenticated");
})

//occurs when access token expires, needs to check if refresh is still valid
router.post('/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    // front end will send them back to login
    if (!refreshToken) {
        return res.status(401)
    }

    jwt.verify(refreshToken, process.env.REFRESH_JWT_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401)
        }
        // generate new access token
        const accessToken = jwt.sign(
            decoded.id,
            process.env.ACCESS_JWT_TOKEN,
            { expiresIn: "15m" }
        );

        res.json(accessToken);
    })

})

module.exports = {
    verifyToken, 
    router
};