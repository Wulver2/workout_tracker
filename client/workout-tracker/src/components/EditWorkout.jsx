import React, {useState} from "react";
// In order to have the edits appear without reloading page
// may have to send a new get request in ListWorkouts for that
// particular workout
const EditWorkout = (id, n, exercises) => {
    const [name, setName] = useState(n);
    const [date, setDate] = useState(Date());
    const [sessionExercises, setSessionExercises] = useState([
        {exercise_id: '', sets_performed: '', reps: '', rir: '', weight: 0, sets_id:''}
    ]);

    const updateWorkout = async (e) => {
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
            <form id="edit_form" className="hide_form" onSubmit={(e) => {updateWorkout(e); hide()}}>
                <label>name</label>
                <input type="text" placeholder={name} onChange={(e) => setName(e.target.value)}/>
                <label>date</label>
                <input type="date" placeholder={date} onChange={(e) => setDate(e.target.value)}/>
                <button type="submit">Submit</button>
                <button type="button" onClick={(e) => hide()}>cancel</button>
            </form>
        </>
    )
}

export default EditWorkout;