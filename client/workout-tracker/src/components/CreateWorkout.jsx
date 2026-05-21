import React, { Fragment, useEffect, useState } from "react";

// Creating a Workout will add new objcts to exercise sets
const CreateWorkout = () => {
    // for exercise form drop down
    const [availableExercises, setAvailableExercises] = useState([]);

    const currentDate = new Date();
    const defaultDate = (currentDate.getMonth + 1) + "-" +
                        currentDate.getDate + "-" + currentDate.getFullYear;

    const [name, setName] = useState("workout");
    const [sessionExercises, setSessionExercises] = useState([
        { exercise_id: '', sets_performed: '', reps: '', rir: '' }
    ]);
    const [date, setDate] = useState(defaultDate);

    //Send query to get exercises
    const getAvailableExercises = async() => {
        try {
            const res = await fetch("http://localhost:8080/exercises");
            const jsonData = await res.json();

            setAvailableExercises(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    }; 

    useEffect(()=> {
        getAvailableExercises();
    },[]);

    const updateName = (value) => {
        setName(value);
    };

    const updateDate = (value) => {
        setDate(value);
        console.log(value);
    };

    const addExercise = () => {
        setSessionExercises([...sessionExercises, { exercise_id: '', sets_performed: '', reps: '', rir: '' }]);
        console.log(sessionExercises);
    };
    const removeExercise = () => {

    };

    const updateExercise = (index, field, value) => {
        const update = [...sessionExercises];
        update[index][field] = value;
        setSessionExercises(update);
        console.log(sessionExercises[index]);
    }

    const handleSubmit = async(e) => {
        // on submit sends query to exercise_set table? for ids, then
        // inserts name, array of ids, and date to workout_session table
        // exercise_sets order (reps, sets, rir)
        // may go back to change set up of workout_session and exercise_set tables
        // to make joins easier? ex. exercise_set table will get another colomn
        // with workout_session_id as a foreign key
        e.preventDefault()


    };

    return (
        <Fragment>
            <h1>Create a new Workout</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="workout_name">Name of Workout: </label>
                <input type="text" id="workout_name" value={name} onChange=
                {(e) => updateName(e.target.value)} required/>

                <label htmlFor="workout_date">date</label>
                <input type="date" id="workout_date" value={date} onChange=
                {(e) => updateDate(e.target.value)}/>

                <label htmlFor="exercises_array">Exercises</label>

                {sessionExercises.map((fields, index) => (
                    <div key={index}>
                    {/* exercise dropdown */}
                    <select onChange={(e) => updateExercise(index, "exercise_id", e.target.value)}>
                    {availableExercises.map(ex => (
                        <option value={ex.exercise_id} key={ex.exercise_id}>{ex.name}</option>
                    ))}
                    </select>

                    {/* sets */}
                    <input type="number" placeholder="Sets" onChange=
                    {(e) => updateExercise(index,"sets_performed", e.target.value)} min={1} required/>
                    {/* reps */}
                    <input type="number" placeholder="Reps" onChange=
                    {(e) => updateExercise(index, "reps", e.target.value)} min={1} required/>
                    {/* rir */}
                    <input type="number" placeholder="RIR" onChange=
                    {(e) => updateExercise(index, "rir", e.target.value)} min={0}/>
                    </div>
                ))}
                {/* add exercise */}
                <button type="button" onClick={addExercise}>+ Add Exercise</button>
                {/* remove exercise */}
                <button type="button"> Remove Exercise</button>
                <button type="submit">Submit</button>
            </form>
        </Fragment>
    );
}

export default CreateWorkout;