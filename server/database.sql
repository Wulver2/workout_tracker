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

--CREATE TABLE exercise_sets (
    -- personal id, exercise id, reps, sets, rir optional, rest between sets
    -- rate of perceived exertion(RPE) optional, notes optional
    
--);

