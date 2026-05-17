const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());

app.use(express.json());

// EXERCISE ROUTES
// Get all exercises

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

// Get exercise based on muscle targeted
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

// Get exercise based on if equipment is needed
app.get("/exercises/:equipment", async(req, res) => {
    try {
        const { equipment } = req.params;
        const matchExercise = await pool.query(`SELECT * FROM exercises WHERE equipment = '${equipment}'`);
        res.json(matchExercise.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ROUTES for prev_workout
// Create (not really creating new one, just 
// adding workout_session id to table once finished)
// Get
// Edit(similar to create)
// (Should old workouts be able to be deleted by users?)


// ROUTES for workout_session
// Create
app.post("/workout", async(req, res) => {
    // TODO: add request body to the query
    // Need to create exercise set data before workout can be created
    try {
        const newSession = await pool.query(`INSERT INTO workout_session ()`);
    } catch (err) {
        console.error(err.message);
    }
});
// Get
app.get("/workout", async(req, res) => {
    try {
        const workouts = await pool.query("SELECT * FROM workout_session");
        res.json(worlouts.allrows);
    } catch (err) {
        console.error(err.message);
    }
});

// Edit
app.put("/workout/:id", async(req,res) =>{
    // need to get req body
    // should sessions be editable or should only the exercises within be?
    try {
        await pool.query(`UPDATE workout_session SET     WHERE session_id = ${id}`)
    } catch (err) {
        console.error(err.message);
    }
});
// Delete

// ROUTES for exercise_sets
// Create
// Get
// Edit
// Delete

app.listen(8080, () => {
    console.log("server 8080 is on");
});