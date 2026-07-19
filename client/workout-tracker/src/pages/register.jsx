import React, { Fragment, useState } from "react"

export function Register() {
    const [form, setForm] = useState({
        firstName: "",
        lastname: "",
        email: "",
        password: ""
    })
    return (
        <Fragment>
            <h1>register</h1>

            <form id="login" action="">
                <div className="user-info">
                    <label htmlFor="" >First name: </label>
                    <input type="text" value={form.firstName} onChange={(e) => {
                    setForm({... form, firstName: e.target.value}); console.log(form)}}/>
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