const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());

app.use(express.json());

// EXERCISE ROUTES

// get all exercises

app.get("/exercises", async(req, res) => {
    try {
        const allExercises = await pool.query("SELECT * FROM exercises");
        res.json(allExercises.rows);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// get exercise based on muscle targeted

app.get("/exercises/:muscle", async(req, res) => {
    try {
        const { muscle } = req.params;
        const matchExercise = await pool.query(`SELECT * FROM exercises WHERE '${muscle}' = ANY (muscle_groups)`);
        res.json(matchExercise.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(8080, () => {
    console.log("server 8080 is on");
});