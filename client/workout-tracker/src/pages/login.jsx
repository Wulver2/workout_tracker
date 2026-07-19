import React, { Fragment, use, useState } from "react"
import "../style/login.css"

export function Login() {
    // firstname, lastname, email, password
    const [form , setForm] = useState({
        email: "",
        password: ""
    })
    return (
        <Fragment>
            <h1>Log in</h1>

            <form id="login" action="">
                <div className="user-info">
                    <label htmlFor="" >email: </label>
                    <input type="email" value={form.email}
                     onChange={(e) => setForm({...form, email: e.target.value})}/>
                </div>
                <div className="pw">
                    <label htmlFor="" >password: </label>
                    <input type="text" value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    />
                </div>
                <button>log in</button>
            </form>
        </Fragment>
    )
}