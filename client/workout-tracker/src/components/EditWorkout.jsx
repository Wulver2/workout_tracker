import React, {useState} from "react";

const EditWorkout = () => {
    const [name, setName] = useState("workout");
    const [date, setDate] = useState(Date());
    const [sessionExercises, setSessionExercises] = useState([
        {sessExercise_id:'', exercise_id: '', sets_performed: '', reps: '', rir: '', weight: 0 }
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
            <form className="hide_form">
                <label>name</label>
                <input type="text" value={name}/>
                <label>date</label>
                <input type="date" />
            </form>
        </>
    )
}

export default EditWorkout;