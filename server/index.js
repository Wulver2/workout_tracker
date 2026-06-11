const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());

app.use(express.json());

// EXERCISE ROUTES
// Get all exercises

app.get("/exercises", async (req, res) => {
    try {
        const allExercises = await pool.query("SELECT * FROM exercises");
        res.json(allExercises.rows);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Get exercise based on both equipment needed and muscle group
app.get("/exercises/{:muscle}&{:equipment}", async (req, res) => {
    try {
        const { muscle, equipment } = req.params;

        if (equipment == undefined) {
            var matchExercise = await pool.query(`
                SELECT * FROM exercises WHERE $1 = ANY (muscle_groups)`, [muscle])
        }
        else if(muscle == undefined) {
            var matchExercise = await pool.query(`
                SELECT * FROM exercises Where equipment = $1`, [equipment])
        }
        else {
            var matchExercise = await pool.query(`
            SELECT * FROM exercises WHERE $1 = ANY (muscle_groups)
            AND equipment = $2`,
                [
                    muscle,
                    equipment
                ]);
        }

        res.json(matchExercise.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Get exercies based on name FOR SEARCH as they type it
app.get("/exercises/:search", async (req, res) => {
    try {
        const { search } = req.params;
        const matchExercise = await pool.query(`
            SELECT * FROM exercises
            WHERE name LIKE $1`, [('%' + search + '%')]);

        res.json(matchExercise.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// ROUTES for workout_session and exercise_sets
// Create
app.post("/workouts", async (req, res) => {
    try {
        const { name, date, sessionExercises } = req.body;
        // need to return session id so i can use them for a
        // column in exercise_sets
        const newSession = await pool.query(
            `INSERT INTO workout_session (name, day_of_session)
            VALUES ('${name}', '${date}') RETURNING session_id`);

        const session_id = newSession.rows[0].session_id;

        // exercise_sets
        for (var i = 0; i < sessionExercises.length; i++) {
            const exercise = sessionExercises[i]

            await pool.query(`
                INSERT INTO exercise_sets (exercise_id, reps, sets_performed, rir, top_weight, session_id)
                VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    exercise.exercise_id,
                    exercise.reps,
                    exercise.sets_performed,
                    exercise.rir,
                    exercise.weight,
                    session_id
                ]);
        }
    } catch (err) {
        console.error(err.message);
    }
});

// Get
app.get("/workouts", async (req, res) => {
    try {
        const workouts = await pool.query(`
            SELECT wo.session_id, wo.name, wo.day_of_session AS date,
            json_agg(json_build_object(
                'exercise_name', e.name,
                'reps', es.reps,
                'sets', es.sets_performed,
                'rir', es.rir,
                'weight', es.top_weight
            )) AS exercises
            FROM workout_session AS wo
            JOIN exercise_sets as es ON wo.session_id = es.session_id
            JOIN exercises as e ON es.exercise_id = e.exercise_id
            GROUP BY wo.session_id
            ORDER BY session_id DESC;`);
        res.json(workouts.rows);

    } catch (err) {
        console.error(err.message);
    }
});

// Edit
app.put("/workout/:id", async (req, res) => {
    // need to get req body
    // should sessions be editable or should only the exercises within be?
    try {
        const update = await pool.query(`UPDATE workout_session SET     WHERE session_id = ${id}`)
    } catch (err) {
        console.error(err.message);
    }
});


app.delete("/workout/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleteExerciseData = await pool.query(`
            DELETE FROM exercise_sets
            WHERE session_id = $1;
            `, [id]);
        const deleteWorkout = await pool.query(`
            DELETE FROM workout_session
            WHERE session_id = $1;
            `, [id]);
        res.json(deleteExerciseData + deleteWorkout);
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(8080, () => {
    console.log("server 8080 is on");
});