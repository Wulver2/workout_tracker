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
            <form>
                <select oname="" id="">
                    <option value="">Choose muscle group</option>
                    <option value="Lats">Lats</option>
                    <option value="Upper Back">Upper Back</option>
                    <option value="Biceps">Biceps</option>
                    <option value="Triceps">Triceps</option>
                    <option value="Chest">Chest</option>
                    <option value="Shoulders">Shoulders</option>
                    <option value="Abdominal">Abs</option>
                    <option value="Quads">Quads</option>
                    <option value="Hamstrings">Hamstrings</option>
                    <option value="Glutes">Glutes</option>
                    <option value="Calves">Calves</option>
                </select>
            </form>
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
                        <td>{exercise.muscle_groups.join(", ")}</td>
                        <td>{exercise.equipment}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </Fragment>
    );
};

export default ListExercises;