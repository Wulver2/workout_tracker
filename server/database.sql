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

--CREATE TABLE workouts (

--);

-- individual workouts
--CREATE TABLE workout_session(
    -- id, exercise set id, time
--);

--CREATE TABLE exercise_sets (
    -- personal id?, exercise id, reps, sets, rir optional, rest between sets
    -- rate of perceived exertion(RPE) optional, notes optional
--);

