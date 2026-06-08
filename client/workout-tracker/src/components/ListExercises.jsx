import React, { Fragment, useEffect, useState } from "react";

const ListExercises = () => {
    const [exercises, setExercises] = useState([]);
    const [muscle, setMuscle] = useState("");
    const [equipment, setEquipment] = useState("");

    const getExercises = async () => {
        try {
            if (muscle != "" || equipment != "") {
                const response = await fetch(`http://localhost:8080/exercises/${muscle}/${equipment}`);
                const jsonData = await response.json();

                setExercises(jsonData)
            }
            else {
                const response = await fetch(`http://localhost:8080/exercises`);
                const jsonData = await response.json();

                setExercises(jsonData)
            }

        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getExercises();
    }, []);

    const search = async (input) => {
        try {
            // exercise names in database are lower case now
            // need to make sure the searches match that
            input = input.toLowerCase()
            if (input.length > 0) {
                const response = await fetch(`http://localhost:8080/exercises/${input}`);
                const jsonData = await response.json();

                setExercises(jsonData);
            }
        } catch (err) {
            console.error(err.message);
        }
    };
    return (
        <Fragment>
            <h1>Exercises</h1>
            <form>
                <input type="text" onChange={ (e) => {search(e.target.value)}} />
                <select onChange={(e) => { setMuscle(e.target.value); getExercises() }} id="">
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
                <select onChange={(e) => { setEquipment(e.target.value); getExercises() }} id="">
                    <option value="equipment">Equipment Required?</option>
                    <option value="none">No</option>
                    <option value="yes">Yes</option>
                </select>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
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