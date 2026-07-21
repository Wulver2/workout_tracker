import React, { Fragment, useState } from "react"
import "../style/login.css"

export function Login({ setUser }) {
    // firstname, lastname, email, password
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async (e) => {
        // fetch route for login
        e.preventDefault();

        try {
            const userInfo = await axios.post("http://localhost:8080/auth/login",
                form
            );

            setUser(userInfo.data);
            //once logged in move to homepage (future dashboard)
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <h1>Log in</h1>

            <form id="login" onSubmit={handleSubmit}>
                <div className="user-info">
                    <label htmlFor="" >email: </label>
                    <input type="email" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="pw">
                    <label htmlFor="" >password: </label>
                    <input type="text" value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>
                <button type="submit">log in</button>
            </form>
        </Fragment>
    )
}