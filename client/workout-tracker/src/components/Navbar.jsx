import { Link } from "react-router-dom"

export function Navbar() {
    return (
        <>
            <div id="header">
                <Link to="/">Home</Link>
                <Link to="/exercises">Browse Exercises</Link>
                <Link to="/new_Workout"> Create New Workout</Link>
                <Link to="/current_workouts">Current Workouts</Link>
            </div>
        </>
    )
}