require('dotenv').config();

const Pool = require("pg").Pool;

const pool = new Pool({
    connectionString: process.env.db_url,
    ssl:
        process.env.NODE_env === "production" 
        ? {rejectUnauthorized: false}
        : false,
    /*user: process.env.db_user,
    password: process.env.db_password,
    host: "localhost",
    port: process.env.db_port,
    database: process.env.db_name*/
});

module.exports = pool;