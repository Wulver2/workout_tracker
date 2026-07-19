import React, { Fragment, useState } from "react"

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
         be the same. if submit button is till pressed,
         fetch should not be made (will be done in a different func)*/
    }
    return (
        <Fragment>
            <h1>register</h1>

            <form id="login" action="">
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
                    <input type="text"
                        value={form.password}
                        onChange={(e) => { setForm({ ...form, password: e.target.value }); }} />
                    <label htmlFor="" >confirm password: </label>
                    <input type="text" />
                </div>
                <button>Sign up</button>
            </form>
        </Fragment>
    )
}