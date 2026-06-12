import React, {useState} from "react";

const EditWorkout = () => {

    const [sessionExercises, setSessionExercises] = useState([
        { exercise_id: '', sets_performed: '', reps: '', rir: '', weight: 0 }
    ]);

    const updateWorkout = async (e, id) => {
        e.preventDefault();

        try {
            const body = { name, date, sessionExercises };
            const response = fetch(`http://localhost:8080/workouts/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });

        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <button className="edit">
                Edit
            </button>
        </>
    )
}

export default EditWorkout;