import React, { Fragment, useEffect, useState } from "react";

// Creating a Workout will add new objcts to exercise sets
const CreateWorkout = () => {
    // for exercise form drop down
    const [availableExercises, setAvailableExercises] = useState([]);

    const currentDate = new Date();
    const defaultDate = (currentDate.getMonth + 1) + "/" +
                        currentDate.getDate + "/" + currentDate.getFullYear;

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

    const addExercise = () => {
        setSessionExercises([...sessionExercises, { exercise_id: '', sets_performed: '', reps: '', rir: '' }]);
        console.log("added Exercise " + sessionExercises);
    };
    const removeExercise = () => {

    };

    const updateExercise = (index, field, value) => {
        const update = [...sessionExercises];
        update[index][field] = value;
        setSessionExercises(update);
        console.log(sessionExercises[index]);
    }
    // TODO: Find way to implement exercise array so that
    // when an exercise is selected, queries user for sets,
    // reps, etc
    return (
        <Fragment>
            <h1>Create a new Workout</h1>
            <form>
                <label htmlFor="workout_name">Name of Workout: </label>
                <input type="text" id="workout_name" value={name}/>

                <label htmlFor="workout_date">date</label>
                <input type="date" id="workout_date" value={date}/>

                <label htmlFor="exercises_array">Exercises</label>

                {sessionExercises.map((fields, index) => (
                    <div key={index}>
                    {/* exercise dropdown */}
                    <select name="" id="">
                    {availableExercises.map(ex => (
                        <option value={ex.exercise_id} key={ex.exercise_id}>{ex.name}</option>
                    ))}
                    </select>

                    {/* sets */}
                    <input type="number" placeholder="Sets" onChange=
                    {(e) => updateExercise(index,"sets", e.target.value)} min={1} required/>
                    {/* reps */}
                    <input type="number" placeholder="Reps" onChange={updateExercise} min={1} required/>
                    {/* rir */}
                    <input type="number" placeholder="RIR" onChange={updateExercise} min={0}/>
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