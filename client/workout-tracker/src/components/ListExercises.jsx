import React, { Fragment, useEffect, useState } from "react";

const ListExercises = () => {
    const [exercises, setExercises] = useState([]);

    const getExercises = async() => {
        try {
            const response = await fetch("http://localhost:8080/exercises");
            const jsonData = await response.json();

            setExercises(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getExercises();
    }, []);

    return (
    <Fragment>
        <h1>Exercises</h1>
        <table>
            <thead>
                <tr>
                    <th>Name of exercise</th>
                    <th>Muscles targeted</th>
                    <th>Equipment needed</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map(exercise => (
                    <tr key={exercise.exercise_id}>
                        <td>{exercise.name}</td>
                        <td>{exercise.muscle_groups}</td>
                        <td>{exercise.equipment}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Fragment>
    );
};

export default ListExercises;