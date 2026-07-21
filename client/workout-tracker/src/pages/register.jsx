import React, { Fragment, useState } from "react"
import axios from "axios"
import "../style/login.css"

export function Register({setUser}) {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    })

    const comparePW = (val) => {
        /* if false message in red should,
         appear stating that passwords must
         be the same. if submit button is still pressed,
         fetch should not be made (will be done in a different func)*/
        var passwordMessage = document.getElementById("pw-error");
        if (val != form.password) {
            passwordMessage.className = ""
            return false
        }
        passwordMessage.className = "hide"
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userInfo = await axios.post("http://localhost:8080/auth/register", form);
            setUser(userInfo.data);

        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1>register</h1>

            <form id="login" onSubmit={handleSubmit}>
                <div className="user-info">
                    <label htmlFor="" >First name: </label>
                    <input type="text"
                        value={form.first_name}
                        onChange={(e) => {
                            setForm({ ...form, first_name: e.target.value })}} />
                    <label htmlFor="" >Last name: </label>
                    <input type="text"
                        value={form.last_name}
                        onChange={(e) => { setForm({ ...form, last_name: e.target.value }); }}
                    />
                    <label htmlFor="" >email: </label>
                    <input type="email"
                        value={form.email}
                        onChange={(e) => { setForm({ ...form, email: e.target.value }); }} />
                </div>
                <div className="pw">
                    <label htmlFor="" >password: </label>
                    <input type="password"
                        value={form.password}
                        onChange={(e) => { setForm({ ...form, password: e.target.value }); }} />
                    <label htmlFor="" >confirm password: </label>
                    <input type="password" onChange={(e) => { comparePW(e.target.value) }} />
                    <p id="pw-error" className={"hide"}>Passwords do not match</p>
                </div>
                <button type="submit">Sign up</button>
            </form>
        </Fragment>
    )
}