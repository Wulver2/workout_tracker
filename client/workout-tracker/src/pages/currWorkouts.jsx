import { Fragment } from "react";
import ListWorkouts from "../components/ListWorkouts"

export function CurrWorkouts({ user }) {
    return (
        <Fragment>
            {user ?
                <ListWorkouts /> : <p>Log in to see your workouts</p>
            }
        </Fragment>
    )
}