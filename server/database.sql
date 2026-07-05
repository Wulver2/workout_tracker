CREATE DATABASE workouts;

CREATE TABLE exercises(
    exercise_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    muscle_groups TEXT[],
    equipment VARCHAR(255)
    --image of machine/equipment if applicable
);

--CREATE TABLE routine(

--);

--CREATE TABLE prev_workouts (
    -- workout_session_id
--);

-- individual workouts
CREATE TABLE workout_session(
    -- id, Array[exercise set id], time
    session_id SERIAL PRIMARY KEY,
    exercise_data INT[],
    day_of_session date 
);

ALTER TABLE workout_session ADD name TEXT;
ALTER TABLE workout_session DROP COLUMN exercise_data;


CREATE TABLE exercise_sets (
    exercise_sets_id SERIAL PRIMARY KEY,
    exercise_id INT,
    FOREIGN KEY (exercise_id)
    REFERENCES exercises(exercise_id),
    reps INT,
    sets_performed INT,
    RIR INT
    -- personal id, exercise id, reps, sets, rir optional, rest between sets
    -- rate of perceived exertion(RPE) optional, notes optional
    
);
ALTER TABLE exercise_sets ADD session_id INT REFERENCES workout_session(session_id);
-- user id linked to workout_sessions
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

