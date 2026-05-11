require('dotenv').config();

const Pool = require("pg").Pool;

const pool = new Pool({
    user: `${process.env.db_user}`,
    password: `${process.env.db_password}`,
    host: "localhost",
    port: `${process.env.db_port}`,
    database: "workouts"
});

module.exports = pool