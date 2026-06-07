import React, { Fragment, useEffect, useState } from "react";

const ListWorkouts = () => {
    const [workouts, setWorkouts] = useState([]);

    const getWorkouts = async() => {
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
            const deleteWorkout = await fetch(`http://localhost:8080/workout/${id}`, {
                method: "DELETE"
            });

            setWorkouts(workouts.filter(workout => workout.session_id !== id));
            console.log(deleteWorkout);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getWorkouts();
    }, []);

    const dateFormat = (date) => {
        const created = new Date(date);
        const createdDate = created.toLocaleDateString('en-US');

        return createdDate
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
                    {/* figure out how to combine exercises with workouts
                     with same session_id */}
                    {workouts.map((fields, index) => (
                        <tr key={workouts[index]["session_id"]} className="workouts">
                            <td>{workouts[index]["name"]}</td>
                            <td>{dateFormat(workouts[index]["date"])}</td>
                            <td>
                                {workouts[index]["exercises"].map((ex, i) => (
                                    <div key={i}>
                                        {ex["exercise_name"]}: {ex["weight"]}  {ex["reps"]} {ex["sets"]}
                                         at {ex["rir"]} RIR
                                    </div>
                                ))}
                            </td>
                            <td>
                                <button>edit</button>
                                {/*ToDo add a warning that this is permenant*/}
                                <button onClick={() => deleteWorkout(workouts[index]["session_id"])}>
                                delete
                                </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
};

export default ListWorkouts;