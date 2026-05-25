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
    
    useEffect(() => {
        getWorkouts();
    }, [])

    return (
        <Fragment>
            <h1>Current Workouts</h1>
            {/*some ro*/}
            {workouts.map((field, index) => (
                <div key={index}> {workouts[index]["name"]} </div>
            ))}
        </Fragment>
    )
};

export default ListWorkouts;