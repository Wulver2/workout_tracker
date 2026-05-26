import React, { Fragment, useEffect, useState } from "react";

const ListWorkouts = () => {
    const [workouts, setWorkouts] = useState([]); 
    const [currSession, setSession] = useState(-1);

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

    const updateSession = (s_id) => {
        if (s_id != currSession) {
            setSession(s_id);
        }
    }

    return (
        <Fragment>
            <h1>Current Workouts</h1>
            {/*some ro*/}
            <table>
                <thead>
                    <tr>
                        <th>workout name</th>
                        <th>date</th>
                        <th>exercise info</th>
                    </tr>
                </thead>

                <tbody>
                    {/* figure out how to combine exercises with workouts
                     with same session_id */}
                    {workouts.map((fields, index) => (
                        <tr>
                            <td>{workouts[index]["name"]}</td>
                            <td>{workouts[index]["date"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
};

export default ListWorkouts;