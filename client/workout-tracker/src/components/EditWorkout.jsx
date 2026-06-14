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

    const show = () => {
        // With the edit button being it's own component
        // shouldn't have to worry about other forms that may be open on page
        const hidden_form = document.getElementById("edit_form");
        hidden_form.classList.remove("hide_form");
        
    };
    const hide = () => {
        const hidden_form = document.getElementById("edit_form");
        hidden_form.classList.add("hide_form")
    }

    return (
        <>
            <button className="edit" onClick={(e) => show()}>
                Edit
            </button>
            <form id="edit_form" className="hide_form">
                <label>name</label>
                <input type="text" placeholder={name}/>
                <label>date</label>
                <input type="date" />
                <button type="button" onClick={(e) => hide()}>cancel</button>
            </form>
        </>
    )
}

export default EditWorkout;