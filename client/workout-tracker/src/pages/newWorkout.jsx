import { Fragment } from "react";
import WorkoutForm from "../components/WorkoutForm";

export function NewWorkout({ user }) {
    return (
        <Fragment>
            <h1>Create a new workout</h1>
            {user ? <WorkoutForm email={user["user"]["email"]}/>
            : <p>Log in or sign up to use this feature</p>}
        </Fragment>
    );
}