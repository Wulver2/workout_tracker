import React, { Fragment, useEffect, useState } from "react";
import WorkoutForm from "./WorkoutForm";

const ListWorkouts = () => {
    const [workouts, setWorkouts] = useState([]);

    const getWorkouts = async () => {
        try {
            const res = await fetch("http://localhost:8080/workouts")
            const jsonData = await res.json();

            setWorkouts(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteWorkout = async (id) => {
        try {
            const deleteWorkout = await fetch(`http://localhost:8080/workouts/${id}`, {
                method: "DELETE"
            });

            setWorkouts(workouts.filter(workout => workout.session_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteExercise = async (id) => {
        try {
            const deleteEx = await fetch(`http://localhost:8080/exercises/${id}`, {
                method: "DELETE"
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteAssurance = (index) => {
        if (confirm("Are you sure you want to delete this workout? Deleting will be permanent")) {
            deleteWorkout(workouts[index]["session_id"]);
        }
    };

    // delete exercise

    useEffect(() => {
        getWorkouts();
    }, []);

    const dateFormat = (date) => {
        const created = new Date(date);
        const createdDate = created.toLocaleDateString('en-US');

        return createdDate
    };

    const show = () => {
        const hidden_form = document.getElementById("create_workout");
        hidden_form.classList.remove("hide_form");

    };

    return (
        <Fragment>
            <h1>Current Workouts</h1>
            <table id="current_workouts">
                <thead>
                    <tr>
                        <th>workout name</th>
                        <th>date</th>
                        <th>exercise info</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {workouts.map((fields, index) => (
                        <tr key={workouts[index]["session_id"]} className="workouts">
                            <td>{workouts[index]["name"]}</td>
                            <td>{dateFormat(workouts[index]["date"])}</td>
                            <td>
                                {workouts[index]["exercises"].map((ex, i) => (
                                    <div key={i}>
                                        {ex["exercise_name"]}: {ex["weight"]}  {ex["reps"]} {ex["sets"]}
                                        at {ex["rir"]} RIR
                                        <button className="remove" onClick={() => deleteExercise(ex["sets_id"])}>-</button>
                                    </div>
                                ))}
                            </td>
                            <td>
                                <button className="edit" onClick={(e) => show()}>
                                    Edit
                                </button>
                                <WorkoutForm og_workout={workouts[index]}
                                    workout_id={workouts[index]["session_id"]}
                                    edit={true}
                                    re_render={getWorkouts} />
                                <button onClick={() => deleteAssurance(index)} className="remove">
                                    Delete Workout
                                </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
};

export default ListWorkouts;