import { Fragment, useState, useEffect } from "react"


const WorkoutForm = ({ og_workout, workout_id, edit = false, re_render }) => {
    // for exercise form drop down
    const [availableExercises, setAvailableExercises] = useState([]);

    const currentDate = new Date();
    // TODO: change this
    const defaultDate = (currentDate.getMonth + 1) + "-" +
        currentDate.getDate + "-" + currentDate.getFullYear;

    const [name, setName] = useState("workout");
    const [sessionExercises, setSessionExercises] = useState([
        { exercise_id: '', sets_performed: '', reps: '', rir: '', weight: 0 }
    ]);

    const [date, setDate] = useState(defaultDate);

    //Send query to get exercises
    const getAvailableExercises = async () => {
        try {
            const res = await fetch("http://localhost:8080/exercises");
            const jsonData = await res.json();

            setAvailableExercises(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    };

    useEffect(() => {
        getAvailableExercises();
        if (edit) {
            setName(og_workout["name"]);
            setDate(og_workout["date"]);
            const og_exercises = og_workout["exercises"].map(ex => ({
                exercise_id: ex.exercise_id,
                sets_performed: ex.sets,
                reps: ex.reps,
                rir: ex.rir,
                weight: ex.weight,
                sets_id: ex.sets_id
            }))
            setSessionExercises(og_exercises)
        }
    }, [edit, og_workout]);

    const updateName = (value) => {
        setName(value);
    };

    const updateDate = (value) => {
        setDate(value);
    };

    const addExercise = () => {
        setSessionExercises([...sessionExercises, { exercise_id: '', sets_performed: '', reps: '', rir: '', sets_id: '' }]);
    };
    const removeExercise = (index) => {
        const element = sessionExercises[index]
        if (index > 0) {
            setSessionExercises(sessionExercises.filter(ex =>
                ex !== element
            ))
        }
    };

    const updateExercise = (index, field, value) => {
        const update = [...sessionExercises];
        update[index][field] = value;
        setSessionExercises(update);
    }

    const hide = () => {
        const hidden_form = document.getElementById("create_workout");
        hidden_form.classList.add("hide_form")
    }

    const handleSubmit = async (e) => {
        // on submit sends query to exercise_set table? for ids, then
        // inserts name, array of ids, and date to workout_session table
        // exercise_sets order (exercise_id, reps, sets, rir)
        e.preventDefault()
        try {
            const method = edit ? "PUT" : "POST"
            const url = edit ? `http://localhost:8080/workouts/${workout_id}` : "http://localhost:8080/workouts";
            const body = { name, date, sessionExercises };
            const response = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            // re render workouts with updated data
            if (response.ok) {
                if (re_render) {
                    re_render();
                    hide();
                }
            }
        } catch (err) {
            console.error(err.message);
        }


    };

    //form should initially be hidden for edits
    return (
        <Fragment>
            <form id="create_workout" className="hide_form" onSubmit={handleSubmit}>

                <div className="form_item">
                    <label htmlFor="workout_name">Name of Workout: </label>
                    <input type="text" id="workout_name" value={name} onChange=
                        {(e) => updateName(e.target.value)} required />

                    <label htmlFor="workout_date">date: </label>
                    <input type="date" id="workout_date" value={date} onChange=
                        {(e) => updateDate(e.target.value)} />
                </div>

                <div className="form_item">
                    <label htmlFor="exercises_array">Add exercises</label>
                    {/* can do fields."parameter" */}
                    {sessionExercises.map((fields, index) => (
                        <div key={index}>
                            {/* exercise dropdown */}
                            <select value={fields.exercise_id} onChange={(e) => updateExercise(index, "exercise_id", e.target.value)}>
                                <option value="">Select an Exercise</option>
                                {availableExercises.map(ex => (
                                    <option value={ex.exercise_id} key={ex.exercise_id}>{ex.name}</option>
                                ))}
                            </select>
                            {/* weight */}
                            <input type="number" placeholder="Top weight" value={fields.weight}
                                onChange={(e) => updateExercise(index, "weight", e.target.value)}
                                min={0} step={0.1} />
                            {/* sets */}
                            <input type="number" placeholder="Sets"
                                value={fields.sets_performed}
                                onChange=
                                {(e) => updateExercise(index, "sets_performed", e.target.value)} min={1} required />
                            {/* reps */}
                            <input type="number" placeholder="Reps" value={fields.reps} onChange=
                                {(e) => updateExercise(index, "reps", e.target.value)} min={1} required />
                            {/* rir */}
                            <input type="number" placeholder="RIR" value={fields.rir} onChange=
                                {(e) => updateExercise(index, "rir", e.target.value)} min={0} />

                            {/* remove exercise */}
                            <button type="button" onClick={(e) => removeExercise(index)} className="remove">
                                Remove Exercise
                            </button>

                        </div>

                    ))}
                </div>
                {/* add exercise */}
                <div id="form_buttons">
                    <button type="button" onClick={addExercise} className="edit">
                        + Add Exercise
                    </button>

                    <button type="submit">Submit</button>
                </div>

            </form>
        </Fragment>
    )
}

export default WorkoutForm