import { Fragment } from "react";
import WorkoutForm from "../components/WorkoutForm";

export function NewWorkout() {
    return (
        <Fragment>
            <h1>Create a new workout</h1>
            <WorkoutForm />
        </Fragment>
    );
}