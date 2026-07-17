import React, { Fragment } from "react"

export function Register() {
    return (
        <Fragment>
            <h1>register</h1>

            <form id="login" action="">
                <div className="user-info">
                    <label htmlFor="" >First name: </label>
                    <input type="text" />
                    <label htmlFor="" >Last name: </label>
                    <input type="text" />
                    <label htmlFor="" >email: </label>
                    <input type="text" />
                </div>
                <div className="pw">
                    <label htmlFor="" >password: </label>
                    <input type="text" />
                    <label htmlFor="" >confirm password: </label>
                    <input type="text" />
                </div>
                <button>Sign up</button>
            </form>
        </Fragment>
    )
}