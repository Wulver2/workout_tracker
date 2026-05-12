import React, { Fragment, useEffect } from "react";

const ListExercises = () => {
    const getExercises = async() => {
        try {
            const response = await fetch("http://localhost:8080/exercises");
            const jsonData = await response.json();

            console.log(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getExercises();
    });

    return (
    <Fragment>
        <h1>Exercises</h1>
    </Fragment>
    );
};

export default ListExercises;