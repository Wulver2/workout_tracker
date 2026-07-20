import React, { Fragment, useState } from "react"
import "../style/login.css"

export function Register() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const comparePW = (val) => {
        /* if false message in red should,
         appear stating that passwords must
         be the same. if submit button is still pressed,
         fetch should not be made (will be done in a different func)*/
        console.log(val)
        var passwordMessage = document.getElementById("pw-error"); 
        if (val != form.password) {
            passwordMessage.className = ""
            return false
        }
        passwordMessage.className = "hide"
        return true
    }
    return (
        <Fragment>
            <h1>register</h1>

            <form id="login">
                <div className="user-info">
                    <label htmlFor="" >First name: </label>
                    <input type="text"
                        value={form.firstName}
                        onChange={(e) => {
                            setForm({ ...form, firstName: e.target.value }); console.log(form)
                        }} />
                    <label htmlFor="" >Last name: </label>
                    <input type="text"
                        value={form.lastName}
                        onChange={(e) => { setForm({ ...form, lastName: e.target.value }); }}
                    />
                    <label htmlFor="" >email: </label>
                    <input type="text"
                        value={form.email}
                        onChange={(e) => { setForm({ ...form, email: e.target.value }); }} />
                </div>
                <div className="pw">
                    <label htmlFor="" >password: </label>
                    <input type="password"
                        value={form.password}
                        onChange={(e) => { setForm({ ...form, password: e.target.value }); }} />
                    <label htmlFor="" >confirm password: </label>
                    <input type="password"  onChange={(e) => {comparePW(e.target.value)}}/>
                    <p id="pw-error" className={"hide"}>Passwords do not match</p>
                </div>
                <button>Sign up</button>
            </form>
        </Fragment>
    )
}