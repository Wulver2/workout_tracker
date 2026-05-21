import React, { Fragment, useEffect, useState } from "react";

// Creating a Workout will add new objcts to exercise sets
const CreateWorkout = () => {
    // for exercise form drop down
    const [availableExercises, setAvailableExercises] = useState([]);

    const currentDate = new Date();
    const defaultDate = (currentDate.getMonth + 1) + "/" +
                        currentDate.getDate + "/" + currentDate.getFullYear;

    const [name, setName] = useState("workout");
    const [exercises, setExercises] = useState([]);
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

                {/*dropdown */}
                <select name="" id="">
                   {availableExercises.map(ex => (
                    <option value={ex.exercise_id}>{ex.name}</option>
                   ))}
                </select>

                <button>Submit</button>
            </form>
        </Fragment>
    );
}

export default CreateWorkout;