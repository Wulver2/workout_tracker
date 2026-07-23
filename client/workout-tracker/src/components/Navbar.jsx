import { Link } from "react-router-dom"
import axios from "axios"

export function Navbar({ user, setUser }) {
    const logout = async () => {
        await axios.post("http://localhost:8080/auth/logout")
        setUser(null);
    }
    return (
        <>
            <div id="header">
                <Link to="/">Home</Link>
                <Link to="/exercises">Browse Exercises</Link>
                <Link to="/new_Workout"> Create New Workout</Link>
                <Link to="/current_workouts">Current Workouts</Link>
                {user ? (
                    <button onClick={logout}>logout</button>
                ) : (
                    <>
                        <Link to="/login">Log in</Link>
                        <Link to="/register">Sign up</Link>
                    </>
                )}
            </div>
        </>
    )
}