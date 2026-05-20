import React, { Fragment, useState } from "react";

// Creating a Workout will add new objcts to exercise sets
const CreateWorkout = () => {
    const currentDate = new Date();
    const defaultDate = (currentDate.getMonth + 1) + "/" +
                        currentDate.getDate + "/" + currentDate.getFullYear;

    const [name, setName] = useState("workout");
    const [exercises, setExercises] = useState([]);
    const [date, setDate] = useState(defaultDate);

    // TODO: Find way to implement exercise array so that
    // when an exercise is selected, queries user for sets,
    // reps, etc
    return (
        <Fragment>
            <h1>Create a new Workout</h1>
            <form>
                <label htmlFor="workout_name">Name of Workout</label>
                <input type="text" id="workout_name"/>

                <label htmlFor="exercises_array">Exercises</label>
                <input type="" id="exercises_array" />

                <label htmlFor="workout_date">date</label>
                <input type="date" id="workout_date"/>
                <button>Submit</button>
            </form>
        </Fragment>
    );
}

export default CreateWorkout;